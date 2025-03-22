import { apiClient } from "./requestClient"

export const fetchSpotifyData = async () => {
    try {
        const response = await apiClient.get('/metrics/spotify')
        return response.data
    } catch (error) {
        console.error('Error fetching Spotify data:', error)
        return null
    }
}
