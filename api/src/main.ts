import dotenv from 'dotenv'
dotenv.config()

import express, { Express } from 'express'
import { config } from './config'
import { RegisterRoutes } from './routes'
import bodyParser from 'body-parser'
import {
    errorMiddleware,
    sessionMiddleware,
    traceMiddleware,
    unknownMiddleware
} from './middlewares'
import { Logger } from './shared'
import path from 'path'

function setupEJS(app: Express) {
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'templates'))
}

function injectCors(app: Express) {
    app.use((req, res, next) => {
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
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization'
        )
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        next()
    })
}

function setupRoutes(app: Express) {
    setupEJS(app)
    injectCors(app)
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(sessionMiddleware)
    app.use(traceMiddleware)

    RegisterRoutes(app)

    app.use(errorMiddleware)
    app.use(unknownMiddleware)
}

async function main() {
    const app: Express = express()
    setupRoutes(app)
    try {
        app.listen(config.port, () => {
            Logger.info(`Server running on port ${config.port}`)
        })
    } catch (e) {
        Logger.error('Unable to start the server', e as Error)
        process.exit(1)
    }
}

main().catch((e) => {
    Logger.error('Error occured', e)
    process.exit(1)
})
