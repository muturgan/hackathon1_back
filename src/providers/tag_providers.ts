import { Request, Response } from 'express';
import { logger } from '../services/logger';
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

        return res.sendStatus(200);

    } catch (err) {
        logger.error(`error on tag adding in process id:${ process.pid }`, err);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
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

        return res.sendStatus(200);

    } catch (err) {
        logger.error(`error on tag deleting in process id:${ process.pid }`, err);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
        });
    }
}
