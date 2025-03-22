import { apiClient } from './requestClient'

export const fetchYoutubeData = async () => {
    try {
        const response = await apiClient.get('/metrics/youtube')
        return response.data
    } catch (error) {
        console.error('Error fetching YouTube data:', error)
        return null
    }
}

export const loginWithYoutube = () => {
    const authUrl = `${import.meta.env.VITE_BACKEND_URI}/api/auth/youtube`
    window.open(authUrl, '_blank', 'width=500,height=600')
}
