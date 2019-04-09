import { request, RequestOptions } from 'https';
import { knex } from '../services/db-driver';
import { env } from '../configs/enviroment';



const getData = (): Promise<any> => {

    return new Promise((resolve, reject) => {
        const options: RequestOptions = {
            hostname: 'cloud-api.yandex.net',
            path: '/v1/disk/resources?path=hackassets&limit=100',
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

            res.on('end', () => {
                try {
                    const data = JSON.parse( (arr as any as Buffer).toString('utf8') );
                    resolve(data);

                } catch (err) { throw err; }
            });
        });

        req.on('error', (error) => {
            return reject(error);
        });

        req.end();
    });
};


const collectImage = async () => {
    try {
        const data = await getData();
        const items = data._embedded.items as Array<{[key: string]: string}>;

        const insertedIds: number[] = await Promise.all(
            items.map(item => knex('images')
                .insert({
                    name: item.name,
                    path: item.file,
                    preview: item.preview,
                    tags: JSON.stringify([]),
                    likedUsers: JSON.stringify([]),
                })
            )
        );

        return {insertedIds};

    } catch (err) { throw err; }
};
