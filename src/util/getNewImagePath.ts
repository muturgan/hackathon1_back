import { request, RequestOptions } from 'https';
import { env } from '../configs/enviroment';



export const getNewImagePath = (imgName: string): Promise<{name: string, newPath: string}> => {
    return new Promise((resolve, reject) => {
        const options: RequestOptions = {
            hostname: 'cloud-api.yandex.net',
            path: env.IMG_PATH + imgName,
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
                    const data: {
                        file: string,
                        [key: string]: any,

                    } = JSON.parse( (arr as any as Buffer).toString('utf8') );
                    resolve({
                        name: imgName,
                        newPath: data.file,
                    });

                } catch (err) { throw err; }
            });
        });

        req.on('error', (error) => reject(error));

        req.end();
    });
};
