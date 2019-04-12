import { Request, Response } from 'express';
import { knex } from '../services/db-driver';
import { unparsedImageType, unparsedImagePrivateType } from '../types/customTypes';
import { parseImages, parseImagesPrivate } from '../util';
import { logger } from '../services/logger';



export async function pGetOneImagePublic(req: Request, res: Response) {
    try {
        const id = +req.params.id;

        if (Number.isNaN(id)) { return res.sendStatus(404); }

        const unparsedImages = await knex('images')
            .select('id', 'name', 'tags', 'likes', 'likedUsers')
            .where({id}) as [unparsedImageType];

        if (!unparsedImages.length) { return res.sendStatus(404); }

        const image = await parseImages(unparsedImages)[0];

        if (!image) {
            logger.info(`there is no image id:${req.params.id} in a db (process id:${ process.pid })`);
            return res.sendStatus(404);
        }

        logger.info(`image id:${req.params.id} was sent to user in process id:${ process.pid }`);
        return res.status(200).send({
            succsess: true,
            image,
        });

    } catch (err) {
        logger.error(`error on image by id sending in process id:${ process.pid }`, err);
        return res.status(500).send({
            success: false,
            message: 'Внутренняя ошибка сервера',
        });
    }
}


export async function pGetOneImagePrivate(req: Request, res: Response) {
    try {
        const id = +req.params.id;

        if (Number.isNaN(id)) { return res.sendStatus(404); }

        const unparsedImages = await knex('images')
            .select()
            .where({id}) as [unparsedImagePrivateType];

        if (!unparsedImages.length) { return res.sendStatus(404); }

        const image = await parseImagesPrivate(unparsedImages)[0];

        if (!image) {
            logger.info(`there is no image id:${req.params.id} in a db (process id:${ process.pid })`);
            return res.sendStatus(404);
        }

        logger.info(`image id:${req.params.id} was sent to user in process id:${ process.pid }`);
        return res.status(200).send({
            succsess: true,
            image,
        });

    } catch (err) {
        logger.error(`error on image by id sending in process id:${ process.pid }`, err);
        return res.status(500).send({
            success: false,
            message: 'Внутренняя ошибка сервера',
        });
    }
}

