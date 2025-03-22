import { config } from '../config'
import {
    APIError,
    YoutubeArtist,
    YoutubeGenre,
    YoutubeProfile,
    YoutubeTrack
} from '../models'
import { SessionStorage } from '../shared'
import { google } from 'googleapis'
import type { Credentials } from 'google-auth-library'

export class YoutubeService {
    private static oauth2Client = new google.auth.OAuth2(
        config.youtube.clientId,
        config.youtube.clientSecret,
        config.youtube.redirectUri
    )

    //#region Authentication
    public static async buildAuthUrl(): Promise<string> {
        const scopes = [
            'https://www.googleapis.com/auth/youtube.readonly',
            'https://www.googleapis.com/auth/youtube.force-ssl',
            'https://www.googleapis.com/auth/youtube'
        ]

        const url = this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        })

        return url
    }

    public static async generateCookieData(
        youtubeAccessCode: string | undefined
    ): Promise<Credentials> {
        if (!youtubeAccessCode) {
            throw new APIError('Invalid Youtube access code', 500)
        }

        const { tokens: credentials } =
            await this.oauth2Client.getToken(youtubeAccessCode)

        return Object.assign({}, credentials)
    }

    public static async refreshAccessToken(): Promise<Credentials> {
        const token = SessionStorage.get<Credentials>('token')

        this.oauth2Client.setCredentials(token!)
        const { credentials } = await this.oauth2Client.refreshAccessToken()

        return Object.assign({}, credentials)
    }
    //#endregion Authentication

    //#region Operations

    public static async fetchProfile(): Promise<YoutubeProfile> {
        const accessToken = SessionStorage.get<string>('accessToken')
        this.oauth2Client.setCredentials({ access_token: accessToken })

        const youtube = google.youtube('v3')
        const response = await youtube.channels.list({
            auth: this.oauth2Client,
            mine: true,
            part: ['snippet']
        })

        const channel = response.data.items?.[0]
        return {
            name: channel?.snippet?.title ?? 'Unknown',
            image: channel?.snippet?.thumbnails?.default?.url ?? null
        }
    }

    private static getCleanTrackName(title: string): string {
        const match = title.match(/^(.+?)\s*[-–:]\s*(.+)$/)

        if (match) {
            return match[2].trim()
        }

        return title.trim()
    }

    public static async fetchTopTracks(): Promise<YoutubeTrack[]> {
        const accessToken = SessionStorage.get<string>('accessToken')
        this.oauth2Client.setCredentials({ access_token: accessToken })

        const youtube = google.youtube('v3')

        const response = await youtube.playlistItems.list({
            auth: this.oauth2Client,
            part: ['snippet', 'contentDetails'],
            playlistId: 'LM',
            maxResults: 10
        })

        const items = response.data.items ?? []
        const tracks: YoutubeTrack[] = []

        for (const item of items) {
            const trackName = this.getCleanTrackName(item.snippet!.title!)

            const channelId: string = item.snippet!.videoOwnerChannelId!
            const channelResponse = await youtube.channels.list({
                auth: this.oauth2Client,
                id: [channelId],
                part: ['snippet']
            })

            const channel = channelResponse.data.items![0].snippet!

            tracks.push({
                rank: item.snippet!.position! + 1,
                name: trackName,
                artist: {
                    name: channel.title!,
                    image: channel.thumbnails!.high!.url ?? null,
                    link: `https://www.youtube.com/channel/${channelId}`
                },
                link: `https://www.youtube.com/watch?v=${item.contentDetails!.videoId}`,
                image: item.snippet!.thumbnails!.high!.url ?? null
            })
        }

        return tracks
    }

    public static async fetchTopArtists(): Promise<YoutubeArtist[]> {
        const accessToken = SessionStorage.get<string>('accessToken')
        this.oauth2Client.setCredentials({ access_token: accessToken })

        const youtube = google.youtube('v3')
        const playlistResponse = await youtube.playlistItems.list({
            auth: this.oauth2Client,
            part: ['snippet'],
            playlistId: 'LM',
            maxResults: 100
        })

        const artistCounts = new Map<
            string,
            { count: number; name: string; channelId: string }
        >()

        const items = playlistResponse.data.items ?? []
        for (const item of items) {
            const artistName = item.snippet?.channelTitle
            const channelId = item.snippet?.channelId

            if (!artistName || !channelId) continue

            if (artistCounts.has(channelId)) {
                artistCounts.get(channelId)!.count += 1
            } else {
                artistCounts.set(channelId, {
                    count: 1,
                    name: artistName,
                    channelId
                })
            }
        }

        const sortedArtists = Array.from(artistCounts.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)

        const channelsResponse = await youtube.channels.list({
            auth: this.oauth2Client,
            part: ['snippet'],
            id: sortedArtists.map((artist) => artist.channelId)
        })

        const channelImages = new Map(
            channelsResponse.data.items?.map((channel) => [
                channel.id!,
                channel.snippet!.thumbnails!.default!.url
            ])
        )

        return sortedArtists.map((artist, index) => ({
            rank: index + 1,
            name: artist.name,
            link: `https://www.youtube.com/channel/${artist.channelId}`,
            image: channelImages.get(artist.channelId) ?? null
        }))
    }

    public static async fetchTopGenres(): Promise<YoutubeGenre[]> {
        return []
    }

    //#endregion Operations
}
