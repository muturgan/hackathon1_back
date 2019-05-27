import { Request, Response } from 'express';
import { isVoted, like, dislike } from '../util';
import { logger } from '../services/logger';




export async function pLike(req: Request, res: Response) {
    try {

        if (await isVoted((req as any).email, +req.params.id)) {
            return res.status(422).send({
                success: false,
                code: 422,
                message: 'Вы уже проголосовали за это изображение',
            });
        }

        await like((req as any).email, +req.params.id);

        return res.status(200).send({
            success: true,
            code: 200,
        });

    } catch (error) {
        logger.error(`error on image likeing in process id:${ process.pid }`, error);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
            error,
        });
    }
}


export async function pDislike(req: Request, res: Response) {
    try {

        if (!(await isVoted((req as any).email, +req.params.id))) {
            return res.status(422).send({
                success: false,
                code: 422,
                message: 'Вы еще не голосовали за это изображение',
            });
        }

        await dislike((req as any).email, +req.params.id);

        return res.status(200).send({
            success: true,
            code: 200,
        });

    } catch (error) {
        logger.error(`error on image dislikeing in process id:${ process.pid }`, error);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
            error,
        });
    }
}
