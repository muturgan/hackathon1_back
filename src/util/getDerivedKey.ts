import crypto = require('crypto');
import util = require('util');
import { env } from '../configs/enviroment';


const pbkdf2 = util.promisify(crypto.pbkdf2);

export async function getDerivedKey(yatoken: string): Promise<string> {
    try {
        const key = await pbkdf2(
            yatoken,
            env.SECRET,
            100000,
            64,
            'sha512',
        );
        return key.toString('hex');

    } catch (err) { throw err; }
}
