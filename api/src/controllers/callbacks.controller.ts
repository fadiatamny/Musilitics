import { Controller, Route, Get, Request, Hidden } from 'tsoa'
import { Request as ExpressRequest } from 'express'
import { config } from '../config'
import { SpotifyService } from '../services'
import { serialize } from '../utils'

@Hidden()
@Route('/callbacks')
export class CallbacksController extends Controller {
    @Get('/spotify')
    public async callbackSpotify(
        @Request() req: ExpressRequest
    ): Promise<void> {
        const code = req.query.code as string
        const res = req.res!
        const cookieData = await SpotifyService.generateCookieData(code)

        res.render('loginCallback', {
            cookieName: config.spotify.cookieName,
            cookieData: encodeURIComponent(serialize(cookieData)),
            clientOrigin: config.appUri
        })
    }
}
