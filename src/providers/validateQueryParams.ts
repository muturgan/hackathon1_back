import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger';



function throwRes(res: Response, message: string) {
    logger.info(`invalid query params on images route in process id:${ process.pid }`);
    return res.status(422).send({
        success: false,
        code: 422,
        message,
    });
}




export function pValidateQueryParas(req: Request, res: Response, next: NextFunction) {
    if ('sortBy' in req.query) {
        if (
            req.query.sortBy !== 'name'
            && req.query.sortBy !== 'likes'
            && req.query.sortBy !== 'id'
                ) {
                    return throwRes(res, 'Параметр запроса sortBy должен принимать одно из значений: name, likes, id');
                }
    }

    if ('direction' in req.query) {
        if (
            req.query.direction !== 'desc'
            && req.query.direction !== 'asc'
                ) {
                    return throwRes(res, 'Параметр запроса direction должен принимать одно из значений: asc, desc');
                }
    }

    if ('limit' in req.query) {
        if (!Number.isInteger(+req.query.limit)) {
                return throwRes(res, 'Параметр запроса limit должен быть целым числом');
            }
    }

    if ('offset' in req.query) {
        if (!Number.isInteger(+req.query.page)) {
                return throwRes(res, 'Параметр запроса page должен быть целым числом');
            }
    }

    return next();
}




