import { apiClient } from './requestClient'

export const fetchSpotifyData = async () => {
    try {
        const response = await apiClient.get('/metrics/spotify')
        return response.data
    } catch (error) {
        console.error('Error fetching Spotify data:', error)
        return null
    }
}

export const loginWithSpotify = () => {
    const authUrl = `${import.meta.env.VITE_BACKEND_URI}/api/auth/spotify`
    window.open(authUrl, '_blank', 'width=500,height=600')
}
