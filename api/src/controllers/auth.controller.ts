import { Controller, Route, Request, Get, Post, Middlewares } from 'tsoa'
import { Request as ExpressRequest } from 'express'
import { SpotifyService } from '../services'
import { buildAuthMiddleware } from '../middlewares'
import { config } from '../config'
import { serialize } from '../utils'

@Route('/auth')
export class AuthController extends Controller {

    @Post('/spotify/refresh')
    @Middlewares(buildAuthMiddleware('spotify'))
    public async refreshAccessToken(): Promise<void> {
        const refreshedCookieData = await SpotifyService.refreshAccessToken()

        this.setHeader(
            'Set-Cookie',
            `${config.spotify.cookieName}=${encodeURIComponent(serialize(refreshedCookieData))}; Path=/; Secure; SameSite=Strict`
        )
    }

    @Get('/spotify')
    public async authSpotify(@Request() req: ExpressRequest): Promise<void> {
        const res = req.res!
        const authQueryParams = await SpotifyService.buildAuthQueryParams()

        res.redirect(
            `https://accounts.spotify.com/authorize?${authQueryParams}`
        )
    }
}
