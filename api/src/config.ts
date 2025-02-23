import { requiredEnv } from './utils'

export const config = {
    spotify: {
        clientId: requiredEnv('SPOTIFY_CLIENT_ID'),
        clientSecret: requiredEnv('SPOTIFY_CLIENT_SECRET'),
        redirectUri: requiredEnv('SPOTIFY_REDIRECT_URI')
    },
    allowedOrigins: (process.env.ALLOWED_ORIGINS
        ? JSON.parse(process.env.ALLOWED_ORIGINS)
        : []) as string[],
    appUri: process.env.APP_URI || 'http://localhost:5173',
    port: process.env.PORT || 4000
}
