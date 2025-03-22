import { apiClient } from "./requestClient"

export const fetchYoutubeData = async () => {
    try {
        const response = await apiClient.get('/metrics/youtube')
        return response.data
    } catch (error) {
        console.error('Error fetching YouTube data:', error)
        return null
    }
}
