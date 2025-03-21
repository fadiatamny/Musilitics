export const config = {
    backendUri: import.meta.env.VITE_BACKEND_URI,
    spotify: {
        cookieName: import.meta.env.VITE_SPOTIFY_COOKIE_NAME || 'spotify-auth'
    },
    youtube: {
        cookieName: import.meta.env.VITE_YOUTUBE_COOKIE_NAME || 'youtube-auth'
    }
} as const satisfies Record<string, string | Record<string, string>>
