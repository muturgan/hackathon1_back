import { knex } from '../services/db-driver';


export async function checkUser(email: string, derivedKey: string): Promise<boolean> {
    const users = await knex('users')
        .select('email')
        .where({
            encodedYatoken: derivedKey,
            email,
        }) as Array<{email: string}>;

    return users.length ? true : false;
}
