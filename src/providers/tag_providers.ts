import { Request, Response } from 'express';
import { logger } from '../services/logger';
import { knex } from '../services/db-driver';
import { isTaged, addTag, deleteTag } from '../util';




export async function pAddTag(req: Request, res: Response) {
    try {
        if (!req.body || !req.body.tag) {
            return res.status(449).send({
                success: false,
                code: 449,
                message: 'Поле tag является обязательным',
            });
        }

        if (await isTaged(req.body.tag, req.params.id)) {
            return res.status(422).send({
                success: false,
                code: 422,
                message: 'Данный тэг уже привязан к этому изображению',
            });
        }

        await addTag(req.body.tag, req.params.id);

        return res.status(200).send({
            success: true,
            code: 200,
        });

    } catch (error) {
        logger.error(`error on tag adding in process id:${ process.pid }`, error);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
            error,
        });
    }
}


export async function pDeleteTag(req: Request, res: Response) {
    try {
        if (!req.body || !req.body.tag) {
            return res.status(449).send({
                success: false,
                code: 449,
                message: 'Поле tag является обязательным',
            });
        }

        if (!(await isTaged(req.body.tag, req.params.id))) {
            return res.status(422).send({
                success: false,
                code: 422,
                message: 'Данный тэг не существует для этого изображения',
            });
        }

        await deleteTag(req.body.tag, req.params.id);

        return res.status(200).send({
            success: true,
            code: 200,
        });

    } catch (error) {
        logger.error(`error on tag deleting in process id:${ process.pid }`, error);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
            error,
        });
    }
}



export async function pGetTags(req: Request, res: Response) {
    try {

        const rows = await knex('images')
            .select('tags')
            .where(knex.raw('JSON_LENGTH(tags) > 0')) as Array<{tags: string}>;

        const tagObj: {[key: string]: string} = {};

        rows.forEach(item => {
            (JSON.parse(item.tags) as Array<string>)
                .forEach(tag => {
                    tagObj[tag] = tag;
                }
            );
        });

        logger.info(`unique tags were sent to client in process id:${ process.pid }`);
        return res.status(200).send({
            success: true,
            code: 200,
            tags: Object.keys(tagObj),
        });

    } catch (error) {
        logger.error(`error on unique tags sending in process id:${ process.pid }`, error);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
            error,
        });
    }
}
