import axios from 'axios'
import querystring from 'querystring'
import { config } from '../config'

export class SpotifyService {
    public static async buildAuthQueryParams(): Promise<string> {
        const scope = 'user-read-private user-read-email playlist-read-private'
        const authQueryParams = querystring.stringify({
            client_id: config.spotify.clientId,
            response_type: 'code',
            redirect_uri: config.spotify.redirectUri,
            scope
        })

        return authQueryParams
    }

    public static async getAccessToken(
        spotifyAccessCode: string | undefined
    ): Promise<string | undefined> {
        if (!spotifyAccessCode) {
            return undefined
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

        const { access_token: token } = response?.data ?? {}
        return token
    }
}
