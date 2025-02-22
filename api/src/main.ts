import dotenv from 'dotenv'
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
import { logger } from './shared'

dotenv.config()

function setupRoutes(app: Express) {
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
        app.listen(config.PORT, () => {
            logger.info(`Server running on port ${config.PORT}`)
        })
    } catch (e) {
        logger.error('Unable to start the server', e)
        process.exit(1)
    }
}

main().catch((e) => {
    logger.error('Error occured', e)
    process.exit(1)
})
