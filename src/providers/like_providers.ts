import { Request, Response } from 'express';
import { isVoted, like, dislike } from '../util';
import { logger } from '../services/logger';




export async function pLike(req: Request, res: Response) {
    try {

        if (await isVoted((req as any).email, +req.params.id)) {
            return res.status(403).send({
                success: false,
                message: 'Вы уже проголосовали за это изображение',
            });
        }

        await like((req as any).email, +req.params.id);

        return res.sendStatus(200);

    } catch (err) {
        logger.error(`error on image likeing in process id:${ process.pid }`, err);
        return res.status(500).send({
            success: false,
            message: 'Внутренняя ошибка сервера',
        });
    }
}


export async function pDislike(req: Request, res: Response) {
    try {

        if (!(await isVoted((req as any).email, +req.params.id))) {
            return res.status(403).send({
                success: false,
                message: 'Вы еще не голосовали за это изображение',
            });
        }

        await dislike((req as any).email, +req.params.id);

        return res.sendStatus(200);

    } catch (err) {
        logger.error(`error on image dislikeing in process id:${ process.pid }`, err);
        return res.status(500).send({
            success: false,
            message: 'Внутренняя ошибка сервера',
        });
    }
}