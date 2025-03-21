import { config } from '@/config'
import axios from 'axios'

export const apiClient = axios.create({
    baseURL: `${config.backendUri}/api`,
    withCredentials: true
})
