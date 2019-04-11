import { Request, Response } from 'express';
import { knex } from '../services/db-driver';
import { unparsedImageType } from '../types/customTypes';
import { parseImages } from '../util';
import { logger } from '../services/logger';



const defaultOptions = {
    sortBy: 'id',
    direction: 'asc',
    limit: 80,
    offset: 0,
};


export async function pGetManyImages(req: Request, res: Response) {
    try {
        const sortBy = req.query.sortBy ? req.query.sortBy : defaultOptions.sortBy;
        const direction = req.query.direction ? req.query.direction : defaultOptions.direction;
        const limit = req.query.limit ? +req.query.limit : defaultOptions.limit;
        const offset = req.query.offset ? +req.query.offset : defaultOptions.offset;

        const unparsedImages = await knex('images')
            .select()
            .orderBy(sortBy, direction)
            .limit(limit)
            .offset(offset) as Array<unparsedImageType>;

        const images = await parseImages(unparsedImages);

        logger.info(`images were sent to user in process id:${ process.pid }`);
        return res.status(200).send({
            succsess: true,
            images,
        });

    } catch (err) {
        logger.error(`error on images sending in process id:${ process.pid }`, err);
        return res.status(500).send({
            success: false,
            message: 'Внутренняя ошибка сервера',
        });
    }
}
