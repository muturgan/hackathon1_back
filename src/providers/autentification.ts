import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger';
import { knex } from '../services/db-driver';
import { verify, isEmailValid } from '../util';
import { env } from '../configs/enviroment';



export async function pAuttentification(req: Request, res: Response, next: NextFunction) {
    try {
        if ( !req.headers || !req.headers['Authorization']) {
            (req as any).email = null;
            return next();
        }

        const jwtToken = req.headers['Authorization'] as string;

        const { email } = await verify(jwtToken, env.SECRET) as {email: string};

        if (!email || !email.length || !isEmailValid(email)) {
            (req as any).email = null;
            return next();
        }

        const rows = await knex('users')
            .select('email')
            .where({email}) as Array<{email: string}>;

        if (rows[0]) {
            (req as any).email = rows[0].email;
            return next();

        } else {
            (req as any).email = null;
            return next();
        }

    } catch (error) {
        switch (error.message) {
            case 'invalid token':
            case 'invalid signature':
                (req as any).email = null;
                return next();

            case 'jwt expired':
                logger.info(`jwt expired`);
                return res.status(419).send({
                    success: false,
                    message: 'Ваша сессия просрочена. Авторизуйтесь повторно пожалуйста.',
                });

            default:
                logger.error(`authorization failed`, error);
                return res.status(500).send({
                    success: false,
                    message: 'Внутренняя ошибка сервера',
                });
        }
    }
}
