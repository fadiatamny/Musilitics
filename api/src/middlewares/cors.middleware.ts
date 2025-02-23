import { Request, Response, NextFunction } from 'express'
import { config } from '../config'

export const corsMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const origin = req.headers.origin

    if (config.allowedOrigins.includes('*')) {
        res.setHeader('Access-Control-Allow-Origin', '*')
    } else {
        if (origin) {
            if (config.allowedOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin)
            }
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*')
        }
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
}
