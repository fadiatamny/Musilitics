import axios from 'axios'
import querystring from 'querystring'
import { config } from '../config'
import { isEmpty } from 'lodash'
import {
    APIError,
    SpotifyArtist,
    SpotifyGenre,
    SpotifyProfile,
    SpotifyTrack
} from '../models'
import { SessionStorage } from '../shared'
import { jsonToQueryParams } from '../utils'

export class SpotifyService {
    //#region Authentication
    public static async buildAuthQueryParams(): Promise<string> {
        const scope =
            'user-read-private user-read-email playlist-read-private user-top-read'
        const authQueryParams = querystring.stringify({
            client_id: config.spotify.clientId,
            response_type: 'code',
            redirect_uri: config.spotify.redirectUri,
            scope
        })

        return authQueryParams
    }

    public static async generateCookieData(
        spotifyAccessCode: string | undefined
    ): Promise<Record<string, any>> {
        if (!spotifyAccessCode) {
            throw new APIError('Invalid Spotify access code', 500)
        }

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                code: spotifyAccessCode,
                redirect_uri: config.spotify.redirectUri,
                grant_type: 'authorization_code'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')}`
                }
            }
        )

        const responseData = response?.data ?? {}

        if (isEmpty(responseData)) {
            throw new APIError('Invalid Spotify access code', 500)
        }

        const { expires_in } = responseData
        const expires_at = Date.now() + expires_in * 1000

        return Object.assign({}, responseData, { expires_at })
    }

    public static async refreshAccessToken(): Promise<Record<string, any>> {
        const refreshToken = SessionStorage.get<string>('refreshToken')

        console.log(refreshToken)

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken!
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')}`
                }
            }
        )

        const responseData = response?.data ?? {}

        if (isEmpty(responseData)) {
            throw new APIError('Invalid Spotify access code', 500)
        }
        const { expires_in } = responseData
        const expires_at = Date.now() + expires_in * 1000

        return Object.assign({}, responseData, { expires_at })
    }
    //#endregion Authentication

    //#region Operations
    private static get authToken(): string {
        return SessionStorage.get<string>('accessToken')!
    }

    public static async fetchProfile(): Promise<SpotifyProfile> {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${this.authToken}`
            }
        })

        const responseData = response?.data ?? {}

        if (isEmpty(responseData)) {
            throw new APIError('Invalid Spotify access code', 500)
        }

        const { display_name, images } = responseData
        const profile = {
            name: display_name,
            image: images[0]?.url ?? null
        }

        return profile
    }

    public static async fetchTopArtists(): Promise<SpotifyArtist[]> {
        const response = await axios.get(
            'https://api.spotify.com/v1/me/top/artists?' +
                jsonToQueryParams({
                    time_range: 'short_term',
                    limit: 10,
                    offset: 0
                }),
            {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            }
        )

        const responseData = response?.data ?? {}

        if (isEmpty(responseData)) {
            throw new APIError('Invalid Spotify access code', 500)
        }

        const { items } = responseData

        return (
            (items as any[])?.map<SpotifyArtist>(
                (item: any, index: number) => ({
                    rank: index + 1,
                    name: item.name,
                    link: item.external_urls.spotify,
                    popularity: item.popularity,
                    image: item.images[0]?.url ?? null
                })
            ) ?? []
        )
    }

    public static async fetchTopTracks(): Promise<SpotifyTrack[]> {
        const url =
            'https://api.spotify.com/v1/me/top/tracks?' +
            jsonToQueryParams({
                offset: 0,
                limit: 10,
                time_range: 'short_term'
            })

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${this.authToken}`
            }
        })

        const responseData = response?.data ?? {}

        if (isEmpty(responseData)) {
            throw new APIError('Invalid Spotify access code', 500)
        }

        const { items } = responseData

        return (
            (items as any[])?.map<SpotifyTrack>((t: any, index: number) => ({
                rank: index + 1,
                name: t.name,
                popularity: t.popularity,
                link: t.external_urls.spotify,
                album: {
                    name: t.album.name,
                    link: t.album.external_urls.spotify,
                    image: t.album.images[0].url
                },
                artist: {
                    name: t.artists[0].name,
                    link: t.artists[0].external_urls.spotify
                }
            })) ?? []
        )
    }

    public static async fetchTopGenres(): Promise<SpotifyGenre[]> {
        const data = new Map<string, number>()

        let page = 0
        do {
            const response = await axios.get(
                'https://api.spotify.com/v1/me/top/artists?' +
                    jsonToQueryParams({
                        time_range: 'short_term',
                        limit: 50,
                        offset: page
                    }),
                {
                    headers: {
                        Authorization: `Bearer ${this.authToken}`
                    }
                }
            )

            const responseData = response?.data ?? {}
            const { items } = responseData

            if (items?.length) {
                const artistGenres: string[] = []
                for (const item of items) {
                    artistGenres.push(...item.genres)
                }

                for (let i = 0; i < artistGenres.length; i++) {
                    const genre = artistGenres[i]
                    data.set(
                        genre,
                        data.has(genre) ? data.get(genre)! + 1 : 10 - i + 1
                    )
                }
            }

            page++
        } while (data.size < 10)

        const sortedKeys = Array.from(data.entries())
            .slice(0, 10)
            .sort(([, valueA], [, valueB]) => valueB - valueA)
            .map(([key]) => key)

        return sortedKeys.map<SpotifyGenre>((genre, index) => ({
            genre,
            rank: index + 1
        }))
    }

    //#endregion Operations
}
