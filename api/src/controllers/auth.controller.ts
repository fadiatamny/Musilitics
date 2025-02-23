import { Controller, Route, Get, Request } from 'tsoa'
import { Request as ExpressRequest } from 'express'
import { SpotifyService } from '../services'

@Route('/auth')
export class AuthController extends Controller {
    @Get('/spotify')
    public async authSpotify(@Request() req: ExpressRequest): Promise<void> {
        const res = req.res!
        const authQueryParams = await SpotifyService.buildAuthQueryParams()

        res.redirect(
            `https://accounts.spotify.com/authorize?${authQueryParams}`
        )
    }
}
