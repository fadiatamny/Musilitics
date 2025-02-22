import { NextFunction, Request, Response } from 'express'
import { SessionStorage } from '../shared'

export const sessionMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    SessionStorage.run(next)
}
