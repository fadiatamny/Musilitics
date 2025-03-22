import { config } from '@/config'

type EventData = {
    status: string
    type: 'login' | 'refresh'
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

    const { [config.spotify.cookieName]: cookieData } = event.data ?? {}

    document.cookie = `${config.spotify.cookieName}=${cookieData!}; Path=/; Secure; SameSite=Strict`


    return 'success'
}
