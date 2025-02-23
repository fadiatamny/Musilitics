import { NextFunction, Request, Response } from 'express'
import { Logger, SessionStorage } from '../shared'
import { v4 } from 'uuid'

export const traceMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    SessionStorage.set('trace', v4())

    Logger.info(`${req.method} ${req.url}`)
    next()
}
