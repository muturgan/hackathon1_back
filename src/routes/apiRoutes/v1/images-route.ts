import { Express } from 'express';
import {
    pGetManyImagesPrivate as pGetManyImages,
    pGetOneImagePrivate as pGetOneImage,
    pValidateQueryParas,
    pUpdatePrivatePaths,
    pValidateId,
        } from '../../../providers';


export class ImagesRoute {

    public routes(app: Express): void {

        app.route('/v1/images')
            .get(
                pValidateQueryParas,
                pUpdatePrivatePaths,
                pGetManyImages,
            );


        app.route('/v1/images/:id')
            .get(
                pValidateId,
                pUpdatePrivatePaths,
                pGetOneImage,
            );

    }
}
