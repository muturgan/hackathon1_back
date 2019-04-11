import { Express } from 'express';
import {
    pGetManyImages,
    pGetOneImage,
    pValidateQueryParas,
    pValidateId
        } from '../../../providers';


export class ImagesRoute {

    public routes(app: Express): void {

        app.route('/v1/images')
            .get( pValidateQueryParas, pGetManyImages);


        app.route('/v1/images/:id')
            .get( pValidateId, pGetOneImage);

    }
}
