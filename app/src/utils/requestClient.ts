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
            !originalRequest.url?.includes('/auth/spotify/refresh') // Prevent loop
        ) {
          debugger
            try {
                await apiClient.post('/auth/spotify/refresh')
                return apiClient.request(error.config!)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)
