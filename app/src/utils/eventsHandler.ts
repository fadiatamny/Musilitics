import { config } from '@/config'

type EventData = {
    status: string
    type: string
    [key: string]: any
}

export const handleLoginEvent = (event: MessageEvent<EventData>) => {
    if (event.origin !== import.meta.env.VITE_BACKEND_URI) {
        console.warn('Received message from untrusted origin:', event.origin)
        return
    }

    if (!event.data || event.data.status !== 'success') {
        console.error('Spotify login failed.')
        return
    }

    if (event.data.type !== 'login') {
        return
    }

    const {
        [config.spotify.cookieName]: spotifyCookieData,
        [config.youtube.cookieName]: youtubeCookieData
    } = event.data ?? {}

    if (!spotifyCookieData && !youtubeCookieData) {
        console.error('No cookies received.')
        return
    }

    if (spotifyCookieData) {
        document.cookie = `${config.spotify.cookieName}=${spotifyCookieData}; Path=/; Secure; SameSite=Strict`
    }

    if (youtubeCookieData) {
        document.cookie = `${config.youtube.cookieName}=${youtubeCookieData}; Path=/; Secure; SameSite=Strict`
    }

    return 'success'
}
