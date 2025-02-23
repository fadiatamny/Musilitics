import { Controller, Route, Get, Request } from 'tsoa'
import { Request as ExpressRequest } from 'express'

import axios from 'axios'
import querystring from 'querystring'
import { config } from '../config'

@Route('/callbacks')
export class CallbacksController extends Controller {
    @Get('/spotify')
    public async callbackSpotify(
        @Request() req: ExpressRequest
    ): Promise<void> {
        const code = req.query.code as string
        const res = req.res!
        //todo: move to spotify.service.ts
        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                code,
                redirect_uri: config.spotify.redirectUri,
                grant_type: 'authorization_code'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')}`
                }
            }
        )

        const { access_token: token } = tokenResponse.data

        res.render('loginCallback', {
            token,
            clientOrigin: config.appUri
        })
    }
}
