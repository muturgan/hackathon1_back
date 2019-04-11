import * as log4js from 'log4js';
import { Log4js, Logger as Log4jsLogger } from 'log4js';


class Logger {
    private _logger: Log4js;

    private _appenders = {
        console: {
            type: 'console'
        },
        file: {
            backups: 3,
            type: 'file',
            compress: true,
            maxLogSize: 10485760,
            filename: `./logs/app.log`
        }
    };

    private _categories = {
        default: {
            level: 'INFO',
            appenders: ['console', 'file'],
        }
    };

    private _makeConfig() {
        return {
            appenders: this._appenders,
            categories: this._categories,
        };
    }

    constructor() {
        this._logger = log4js.configure(this._makeConfig());
    }

    public get app(): Log4jsLogger {
        return this._logger.getLogger();
    }
}

const LoggerI = new Logger();
export const logger = LoggerI.app;
