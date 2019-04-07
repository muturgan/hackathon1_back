import { Request } from 'express';
import { knex } from '../services/db-driver';


export const setPaginationByObj = async (req: Request, table: string, filters: {[key: string]: string}): Promise<{begin: number, pages: number, itemsPerPage: number}> => {
    let itemsPerPage = 20;
    let page = 1;

    if (req.query && req.query.itemsPerPage && !Number.isNaN(req.query.itemsPerPage)) {
        itemsPerPage = +req.query.itemsPerPage;
    }
    delete req.query.itemsPerPage;

    if (req.query && req.query.page && !Number.isNaN(req.query.page)) {
        page = +req.query.page;
    }
    delete req.query.page;

    const countRow = await knex(table)
        .count('* as count')
        .where(filters) as Array<{count: number}>;

    const pages = Math.ceil(countRow[0].count / itemsPerPage);

    const begin = 0 + itemsPerPage * (page - 1);

    return {begin, pages, itemsPerPage};
};
