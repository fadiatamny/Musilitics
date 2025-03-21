import dotenv from 'dotenv'
dotenv.config()

import express, { Express } from 'express'
import { config } from './config'
import { RegisterRoutes } from './routes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {
    corsMiddleware,
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

function prepareApp(app: Express) {
    setupEJS(app)
    app.use(corsMiddleware)
    app.use(cookieParser());
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
    prepareApp(app)
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
