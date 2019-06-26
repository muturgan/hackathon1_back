import { Request, Response, NextFunction } from 'express';
import { knex } from '../services/db-driver';
import { checkLinkActuality, updateTestPath, getNewImagePath } from '../util';
import { logger } from '../services/logger';




export async function pUpdatePrivatePaths(req: Request, res: Response, next: NextFunction) {
    try {
        const rows = await knex('jsontest')
            .select('path')
            .where({id: 1}) as Array<{path: string}>;

        const testPath = rows.length ? rows[0].path : '';

        if (testPath && await checkLinkActuality(testPath)) {
            return next();
        }

        const names = await knex('images')
            .select('name') as Array<{name: string}>;

        const newPrivatePaths = await Promise.all(
            names.map(item => getNewImagePath(item.name))
        );

        await Promise.all(
            newPrivatePaths.map(item => knex('images')
                .where('name', '=', item.name)
                .update({
                    privatePath: item.newPath,
                })
            )
        );

        await updateTestPath();

        return next();

    } catch (error) {
        logger.error(`error on image private links updating in process id:${ process.pid }`, error);
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Внутренняя ошибка сервера',
            error,
        });
    }
}
