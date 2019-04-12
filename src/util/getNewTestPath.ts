import { request, RequestOptions } from 'https';
import { knex } from '../services/db-driver';
import { env } from '../configs/enviroment';



export const updateTestPath = (): Promise<void> => {

    return new Promise((resolve, reject) => {
        const options: RequestOptions = {
            hostname: 'cloud-api.yandex.net',
            path: env.TEST_PATH,
            method: 'GET',
            headers: {
                Authorization: `OAuth ${env.YA_DISK_AUTH_KEY}`,
                ['Content-Type']: 'application/json',
            },
        };

        const req = request(options, res => {
            if (res.statusCode !== 200) {
                return reject(res.statusMessage);
            }

            const arr: Array<Buffer> = [];

            res.on('data', (chunk: Buffer) => {
                arr.push(chunk);
            });

            res.on('end', async () => {
                try {
                    const data: {
                        href: string,
                        method: 'GET',
                        templated: false,

                    } = JSON.parse( (arr as any as Buffer).toString('utf8') );

                    await knex('jsontest')
                        .where('id', '=', 1)
                        .update({path: data.href});

                    resolve();

                } catch (err) { return reject(err); }
            });
        });

        req.on('error', (error) => reject(error));

        req.end();
    });
};
