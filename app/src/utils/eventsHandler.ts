import { config } from '@/config'

type EventData = {
    status: string
    type: string
    [key: string]: any
}

export const handleLoginEvent = (
    source: 'youtube' | 'spotify',
    event: MessageEvent<EventData>
) => {
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

    const cookieName = config[source].cookieName
    const { [cookieName]: cookieData } = event.data ?? {}
    document.cookie = `${cookieName}=${cookieData!}; Path=/; Secure; SameSite=Strict`

    return 'success'
}
