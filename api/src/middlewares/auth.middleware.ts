import { NextFunction, Request, Response } from 'express'
import { SessionStorage } from '../shared'
import { config } from '../config'
import { APIError } from '../models'

export const buildAuthMiddleware = (authScope: 'spotify' | 'youtube') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const cookieName = getCookieName(authScope)

        const cookie = req.cookies[cookieName]

        if (!cookie) {
            return next(new APIError('Unauthorized', 401))
        }

        const parsed = extractAuthFromCookie(cookie)

        if (req.path.includes('/refresh')) {
            return next()
        }

        if (parsed.expires_at < Date.now() + 1000 * 60 * 5) {
            return next(new APIError('Token expired', 401))
        }

        next()
    }
}

function getCookieName(authScope: 'spotify' | 'youtube') {
    switch (authScope) {
        case 'spotify':
            return config.spotify.cookieName
        case 'youtube':
            return config.youtube.cookieName
        default:
            throw new Error('Invalid auth scope')
    }
}

function extractAuthFromCookie(cookie: string) {
    const parsed = JSON.parse(cookie)

    SessionStorage.set('token', parsed)
    SessionStorage.set('accessToken', parsed.access_token)
    SessionStorage.set('refreshToken', parsed.refresh_token)

    return parsed
}
