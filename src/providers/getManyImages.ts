import { Request, Response } from 'express';
import { knex } from '../services/db-driver';
import { escape } from 'mysql';
import { unparsedImageType, unparsedImagePrivateType } from '../types/customTypes';
import { parseImages, parseImagesPrivate } from '../util';
import { logger } from '../services/logger';



const defaultOptions = {
    sortBy: 'id',
    direction: 'asc',
    limit: 80,
    page: 1,
};


export async function pGetManyImagesPublic(req: Request, res: Response) {
    try {
        const sortBy = req.query.sortBy ? req.query.sortBy : defaultOptions.sortBy;
        const direction = req.query.direction ? req.query.direction : defaultOptions.direction;
        const limit = req.query.limit ? +req.query.limit : defaultOptions.limit;
        const offset = req.query.page ? ((+req.query.page - 1) * limit) : (defaultOptions.page - 1) * limit;
        const tag = (req.query.tag && decodeURI(req.query.tag) !== 'all') ? decodeURI(req.query.tag) : null;

        const result = await Promise.all([
            knex('images')
                .count('id as count')
                .where(tag
                    ? knex.raw(`JSON_CONTAINS(tags, JSON_ARRAY(${escape(tag)}))`)
                    : knex.raw(`1 = 1`)) as PromiseLike<[{count: number}]>,
            knex('images')
                .select('id', 'name', 'tags', 'likes', 'likedUsers')
                .where(tag
                    ? knex.raw(`JSON_CONTAINS(tags, JSON_ARRAY(${escape(tag)}))`)
                    : knex.raw(`1 = 1`))
                .orderBy(sortBy, direction)
                .limit(limit)
                .offset(offset) as PromiseLike<Array<unparsedImageType>>,
        ]);

        const pages = Math.ceil(result[0][0].count / limit);

        const images = await parseImages(result[1], (req as any).email);

        logger.info(`images were sent to user in process id:${ process.pid }`);
        return res.status(200).send({
            success: true,
            code: 200,
            images,
            pages,
        });

    } catch (error) {
        logger.error(`error on images sending in process id:${ process.pid }`, error);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
            error,
        });
    }
}


export async function pGetManyImagesPrivate(req: Request, res: Response) {
    try {
        const sortBy = req.query.sortBy ? req.query.sortBy : defaultOptions.sortBy;
        const direction = req.query.direction ? req.query.direction : defaultOptions.direction;
        const limit = req.query.limit ? +req.query.limit : defaultOptions.limit;
        const offset = req.query.page ? ((+req.query.page - 1) * limit) : (defaultOptions.page - 1) * limit;
        const tag = (req.query.tag && decodeURI(req.query.tag) !== 'all') ? decodeURI(req.query.tag) : null;
        logger.info('try tags');

        const result = await Promise.all([
            knex('images')
                .count('id as count')
                .where(tag
                    ? knex.raw(`JSON_CONTAINS(tags, JSON_ARRAY(${escape(tag)}))`)
                    : knex.raw(`1 = 1`)) as PromiseLike<[{count: number}]>,
            knex('images')
                .select()
                .where(tag
                    ? knex.raw(`JSON_CONTAINS(tags, JSON_ARRAY(${escape(tag)}))`)
                    : knex.raw(`1 = 1`))
                .orderBy(sortBy, direction)
                .limit(limit)
                .offset(offset) as PromiseLike<Array<unparsedImagePrivateType>>,
        ]);

        const pages = Math.ceil(result[0][0].count / limit);

        const images = await parseImagesPrivate(result[1], (req as any).email);

        logger.info(`images were sent to user in process id:${ process.pid }`);
        return res.status(200).send({
            success: true,
            code: 200,
            images,
            pages,
        });

    } catch (error) {
        logger.error(`error on images sending in process id:${ process.pid }`, error);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
            error,
        });
    }
}
