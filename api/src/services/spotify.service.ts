import axios from 'axios'
import querystring from 'querystring'
import { config } from '../config'
import { isEmpty } from 'lodash'
import { APIError, SpotifyProfile } from '../models'
import { SessionStorage } from '../shared'
import { jsonToQueryParams } from '../utils'

export class SpotifyService {
    //#region Authentication
    public static async buildAuthQueryParams(): Promise<string> {
        const scope = 'user-read-private user-read-email playlist-read-private user-top-read'
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
    ): Promise<string> {
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

    public static async fetchTopArtists(): Promise<any[]> {
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

        return items
    }

    public static async fetchTopTracks(): Promise<any[]> {
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

        return items
    }

    public static async fetchTopGenres(): Promise<string[]> {
        const genres = new Set<string>()

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
                const artistGenres = items.map((item: any) => item.genres)
                for (const genre of artistGenres) {
                    genres.add(genre)
                }
            }

            page++
        } while (genres.size < 10)

        return Array.from(genres).slice(0, 11)
    }

    //#endregion Operations
}
