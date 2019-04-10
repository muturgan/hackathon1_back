import { Express } from 'express';
import logger from '../../../services/logger';
import { pGetManyImages, pGetOneImage } from '../../../providers/images';


export class ImagesRoute {

    public routes(app: Express): void {

        app.route('/v1/images')
            .get( async (req, res) => {
                try {

                    const images = await pGetManyImages(req.query);

                    logger.info(`images were sent to user in process id:${ process.pid }`);
                    return res.status(200).send({
                        succsess: true,
                        images,
                    });

                } catch (error) {
                    logger.error(`error on images sending in process id:${ process.pid }`, error);
                    return res.status(500).send({
                        success: false,
                        message: 'Внутренняя ошибка сервера',
                    });
                }
            }
        );


        app.route('/v1/images/:id')
            .get( async (req, res) => {
                try {

                    const image = await pGetOneImage(+req.params.id);

                    if (!image) {
                        logger.info(`there is no image id:${req.params.id} in a db (process id:${ process.pid })`);
                        return res.sendStatus(404);
                    }

                    logger.info(`image id:${req.params.id} was sent to user in process id:${ process.pid }`);
                    return res.status(200).send({
                        succsess: true,
                        image,
                    });

                } catch (error) {
                    logger.error(`error on image by id sending in process id:${ process.pid }`, error);
                    return res.status(500).send({
                        success: false,
                        message: 'Внутренняя ошибка сервера',
                    });
                }
            }
        );

    }
}
