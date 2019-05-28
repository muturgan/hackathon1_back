import { request, RequestOptions } from 'https';



export const checkLinkActuality = (path: string): Promise<boolean> => {

    return new Promise((resolve, reject) => {
        const options: RequestOptions = {
            hostname: 'downloader.disk.yandex.ru',
            path,
            method: 'GET',
            headers: {
                ['Content-Type']: 'application/json',
            },
        };

        const req = request(options, res => {
            if (res.statusCode === 410) {
                return resolve(false);
            }

            if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) {
                return reject(res.statusMessage);
            }

            res.on('data', (chunk: Buffer) => {
                // do not delete this listener!
            });

            res.on('end', () => {
                return resolve(true);
            });
        });

        req.on('error', (error) => reject(error));

        req.end();

    });
};
