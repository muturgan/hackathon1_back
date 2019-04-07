import { request, RequestOptions } from 'http';
import { userDataType } from '../types/customTypes';


export const getUserData = (yatoken: string): Promise<{
    authorized: boolean,
    userData?: userDataType,
}> => {

    return new Promise((resolve, reject) => {
        const options: RequestOptions = {
            hostname: 'login.yandex.ru/info?format=json',
            method: 'GET',
            headers: {
                Authorization: `OAuth ${yatoken}`,
                ['Content-Type']: 'application/json',
            },
        };

        const req = request(options, res => {
            if (res.statusCode === 401) {
                return resolve({authorized: false});
            }

            if (res.statusCode !== 200) {
                return reject(res.statusMessage);
            }

            const arr: Array<Buffer> = [];

            res.on('data', (chunk: Buffer) => {
                arr.push(chunk);
            });

            res.on('end', () => {
                try {
                    const data: userDataType = JSON.parse( (arr as any as Buffer).toString('utf8') );
                    resolve({
                        authorized: true,
                        userData: data,
                    });

                } catch (err) { throw err; }
            });
        });

        req.on('error', (error) => {
            return reject(error);
        });

        req.end();
    });
};
