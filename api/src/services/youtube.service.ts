import { config } from '../config'
import { APIError } from '../models'
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
    //#endregion Operations
}
