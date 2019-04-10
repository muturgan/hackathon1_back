import knexfile = require('../../knexfile.js');
import envjson = require('../../env.json');

const dbConfig = knexfile.connection;

export const env: {

    readonly PORT: string,

    readonly DB_HOST: string,
    readonly DB_USER: string,
    readonly DB_PASSWORD: string,
    readonly DB_DATABASE: string,
    readonly DB_PORT: string,
    readonly DB_TIMEZONE: string,

    readonly SECRET: string,
    readonly YA_DISK_AUTH_KEY: string,
    readonly YA_DISK_PATH: string,

        } = {
            ...envjson,
            DB_HOST: dbConfig.host,
            DB_USER: dbConfig.user,
            DB_PASSWORD: dbConfig.password,
            DB_DATABASE: dbConfig.database,
            DB_PORT: dbConfig.port,
            DB_TIMEZONE: dbConfig.timezone,
        };
