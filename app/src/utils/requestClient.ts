import { config } from '@/config'
import axios, { AxiosError } from 'axios'

export const apiClient = axios.create({
    baseURL: `${config.backendUri}/api`,
    withCredentials: true
})

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
        const originalRequest = error.config!

        if (
            error.response?.status === 401 &&
            error.response.data?.message === 'Token expired' &&
            !originalRequest.url?.includes('/refresh') // Prevent loop
        ) {
          if (originalRequest.url?.includes('/spotify')) {
            await handleSpotifyTokenRefresh(error)
          }
          if (originalRequest.url?.includes('/youtube')) {
            await handleYoutubeTokenRefresh(error)
          }
        }
        return Promise.reject(error)
    }
)

async function handleSpotifyTokenRefresh(error: AxiosError<any>) {
    try {
        await apiClient.post('/auth/spotify/refresh')
        return apiClient.request(error.config!)
    } catch (refreshError) {
        return Promise.reject(refreshError)
    }
}


async function handleYoutubeTokenRefresh(error: AxiosError<any>) {
    try {
        await apiClient.post('/auth/spotify/refresh')
        return apiClient.request(error.config!)
    } catch (refreshError) {
        return Promise.reject(refreshError)
    }
}
