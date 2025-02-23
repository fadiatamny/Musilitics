import winston from 'winston'
import { SessionStorage } from './sessionStorage'

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`
})

export class Logger {
    private static _logger: winston.Logger = Logger._buildLogger()

    private static _buildLogger(): winston.Logger {
        return winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                logFormat
            ),
            transports: [new winston.transports.Console()]
        })
    }

    public static log(message: string, metadata?: string | object): void {
        this._logger.info(message, {
            metadata,
            context: SessionStorage.dump()
        })
    }

    public static info(message: string, metadata?: string | object): void {
        this._logger.info(message, {
            metadata,
            context: SessionStorage.dump()
        })
    }

    public static warn(message: string, metadata?: string | object): void {
        this._logger.warn(message, {
            metadata,
            context: SessionStorage.dump()
        })
    }

    public static error(message: string, metadata?: string | object): void {
        this._logger.error(message, {
            metadata,
            context: SessionStorage.dump()
        })
    }
}
