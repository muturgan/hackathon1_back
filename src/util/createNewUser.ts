import { knex } from '../services/db-driver';


export function createNewUser(email: string, encodedYatoken: string) {
    return knex('users')
        .insert({
            email,
            encodedYatoken
        }) as PromiseLike<Array<number>>;
}
