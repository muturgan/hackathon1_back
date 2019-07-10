import { knex } from '../services/db-driver';
import { escape } from 'mysql';
import { knexRawSelectResponseType, knexRawUpdateResponseType } from '../types/customTypes';



export async function isTaged(tag: string, id: number): Promise<boolean> {
    try {
        const result = await knex.raw(`
            SELECT id FROM images WHERE
            JSON_CONTAINS(tags, JSON_ARRAY(${escape(tag)}))
            AND id = ${escape(id)}
            LIMIT 1;
        `) as knexRawSelectResponseType<{id: number}>;

        return Boolean(result[0].length);

    } catch (err) { throw err; }
}


export function addTag(tag: string, id: number): PromiseLike<knexRawUpdateResponseType> {

    return knex.raw(`
        UPDATE images SET
        tags = JSON_ARRAY_APPEND(tags, '$', ${escape(tag)})
        WHERE id = ${escape(id)};
    `) as PromiseLike<knexRawUpdateResponseType>;
}


export function deleteTag(tag: string, id: number): PromiseLike<knexRawUpdateResponseType> {

    return knex.raw(`
        UPDATE images SET
        tags = JSON_REMOVE(
            tags,
            JSON_UNQUOTE(
                JSON_SEARCH(tags, 'one', ${escape(tag)})
            )
        )
        WHERE id = ${escape(id)};
    `) as PromiseLike<knexRawUpdateResponseType>;
}
