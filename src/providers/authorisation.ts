import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger';
import { knex } from '../services/db-driver';
import { attackerDetails, verify, isEmailValid } from '../util';
import { env } from '../configs/enviroment';



export async function pAuthorisation(req: Request, res: Response, next: NextFunction) {
    try {
        if ( !req.headers || !req.headers['authorization']) {
            logger.error(`unauthorized user tried to perform some action as verified`, attackerDetails(req));
            return res.status(401).send({
                success: false,
                code: 401,
                message: 'Вам отказано в доступе',
            });
        }

        const jwtToken = req.headers['authorization'] as string;

        const { email } = await verify(jwtToken, env.SECRET) as {email: string};

        if (!email || !email.length || !isEmailValid(email)) {
            logger.error(`user tried to pass invalid jwt token`, attackerDetails(req));
            return res.status(401).send({
                success: false,
                code: 401,
                message: `Вам отказано в доступе`,
            });
        }

        const rows = await knex('users')
            .select('email')
            .where({email}) as Array<{email: string}>;

        if (rows[0]) {
            (req as any).email = email;
            return next();

        } else {
            logger.error(`unauthorized user tried to perform some action as verified`, attackerDetails(req));
            return res.status(401).send({
                success: false,
                code: 401,
                message: 'Вам отказано в доступе',
            });
        }

    } catch (error) {
        switch (error.message) {
            case 'invalid token':
            case 'invalid signature':
                logger.error(error, `unauthorized user tried to perform some action as verified`, attackerDetails(req));
                return res.status(401).send({
                    success: false,
                    code: 401,
                    message: 'Вам отказано в доступе',
                });

            case 'jwt expired':
                logger.info(`jwt expired`);
                return res.status(419).send({
                    success: false,
                    code: 419,
                    message: 'Ваша сессия просрочена. Авторизуйтесь повторно пожалуйста.',
                });

            default:
                logger.error(`authorization failed`, error);
                return res.status(500).send({
                    success: false,
                    code: 500,
                    message: 'Внутренняя ошибка сервера',
                    error,
                });
        }
    }
}
