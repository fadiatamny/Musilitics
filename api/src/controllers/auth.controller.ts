import { Controller, Route, Get, Request } from 'tsoa'
import { Request as ExpressRequest } from 'express'

import querystring from 'querystring'
import { config } from '../config'

@Route('/auth')
export class AuthController extends Controller {
    @Get('/spotify')
    public async authSpotify(@Request() req: ExpressRequest): Promise<void> {
        const res = req.res!

        const scope = 'user-read-private user-read-email playlist-read-private'
        const authQueryParams = querystring.stringify({
            client_id: config.spotify.clientId,
            response_type: 'code',
            redirect_uri: config.spotify.redirectUri,
            scope
        })

        res.redirect(
            `https://accounts.spotify.com/authorize?${authQueryParams}`
        )
    }
}
