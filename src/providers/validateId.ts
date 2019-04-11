import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger';


export function pValidateId(req: Request, res: Response, next: NextFunction) {

    if (!Number.isInteger(+req.params.id)) {
        logger.info(`invalid image id in process id:${ process.pid }`);
        return res.sendStatus(404);
    }

    return next();
}




