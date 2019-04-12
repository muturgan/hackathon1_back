import { knex } from '../services/db-driver';
import { escape } from 'mysql';
import { knexRawSelectResponseType, knexRawUpdateResponseType } from '../types/customTypes';



export async function isVoted(email: string, id: number): Promise<boolean> {
    try {
        const result = await knex.raw(`
            SELECT id FROM images WHERE
            JSON_CONTAINS(likedUsers, JSON_ARRAY(${escape(email)}))
            AND id = ${escape(id)}
            LIMIT 1;
        `) as knexRawSelectResponseType;

        return Boolean(result[0].length);

    } catch (err) { throw err; }
}


export function like(email: string, id: number): PromiseLike<knexRawUpdateResponseType> {

    return knex.raw(`
        UPDATE images SET
        likes = likes + 1,
        likedUsers = JSON_ARRAY_APPEND(likedUsers, '$', ${escape(email)})
        WHERE id = ${escape(id)};
    `) as PromiseLike<knexRawUpdateResponseType>;
}


export function dislike(email: string, id: number): PromiseLike<knexRawUpdateResponseType> {

    return knex.raw(`
        UPDATE images SET
        likes = likes - 1,
        likedUsers = JSON_REMOVE(
            likedUsers,
            JSON_UNQUOTE(
                JSON_SEARCH(likedUsers, 'one', ${escape(email)})
            )
        )
        WHERE id = ${escape(id)};
    `) as PromiseLike<knexRawUpdateResponseType>;
}
