import { Express } from 'express';
import { logger } from '../../../services/logger';
import { userDataType } from '../../../types/customTypes';
import {
    attackerDetails,
    getUserData,
    checkUser,
    getDerivedKey,
    getJwtTokcen,
    createNewUser,
} from '../../../util';

export class LoginRoute {

    public routes(app: Express): void {

        app.route('/v1/test').get((req, res) => {res.status(200).send('fuck yeah!'); });

        app.route('/v1/login')
            .post( async (req, res) => {
                try {
                    if (!req.body.yatoken) {
                        logger.info(`empty yandex token`, attackerDetails(req));
                        return res.status(449).send({
                            success: false,
                            code: 449,
                            message: 'Вы не предоставили Яндекс oauth токен.',
                        });
                    }

                    const result = await getUserData(req.body.yatoken);

                    if (!result.authorized) {
                        logger.info(`invalid yandex token`, attackerDetails(req));
                        return res.status(401).send({
                            success: false,
                            code: 401,
                            message: 'Вы предоставили невалидный Яндекс oauth токен.',
                        });
                    }

                    const userData = result.userData as userDataType;

                    const encodedYatoken = await getDerivedKey(req.body.yatoken);

                    const isRegistried = await checkUser(userData.default_email, encodedYatoken);

                    const jwtToken = getJwtTokcen(userData.default_email);

                    if (!isRegistried) {
                        await createNewUser(userData.default_email, encodedYatoken);
                        logger.info(`new user created`);
                    }

                    logger.info(`user ${userData.default_email} login in process id:${ process.pid }`);
                    return res.status(200).send({
                        succsess: true,
                        jwtToken,
                        userData,
                    });

                } catch (error) {
                    logger.error(`login failed`, error);
                    return res.status(500).send({
                        success: false,
                        code: 500,
                        message: 'Внутренняя ошибка сервера',
                    });
                }
            }
        );

    }
}
