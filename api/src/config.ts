import { requiredEnv } from './utils'

export const config = {
    spotify: {
        clientId: requiredEnv('SPOTIFY_CLIENT_ID'),
        clientSecret: requiredEnv('SPOTIFY_CLIENT_SECRET'),
        redirectUri: requiredEnv('SPOTIFY_REDIRECT_URI'),
        cookieName: process.env.SPOTIFY_COOKIE_NAME || 'spotify-auth'
    },
    youtube: {
        clientId: requiredEnv('GOOGLE_CLIENT_ID'),
        clientSecret: requiredEnv('GOOGLE_CLIENT_SECRET'),
        redirectUri: requiredEnv('GOOGLE_REDIRECT_URI'),
        cookieName: process.env.YOUTUBE_COOKIE_NAME || 'youtube-auth'
    },
    allowedOrigins: getAllowedOrigins(),
    appUri: process.env.APP_URI || 'http://localhost:5173',
    port: process.env.PORT || 3000
}

function getAllowedOrigins(): string[] {
    const appUri = process.env.APP_URI
    const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? JSON.parse(process.env.ALLOWED_ORIGINS)
        : []
    const allowedOriginsSet = new Set(allowedOrigins)

    if (process.env.APP_URI) {
        allowedOriginsSet.add(appUri)
    }

    allowedOriginsSet.add(`http://localhost:${process.env.PORT || 3000}`)

    return allowedOrigins
}
