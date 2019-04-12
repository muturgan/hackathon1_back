import { Express } from 'express';
import {
    pLike,
    pDislike,
    pValidateId,
    pAuthorisation,
        } from '../../../providers';


export class LikesRoute {

    public routes(app: Express): void {

        app.route('/v1/images/:id/like')
            .patch(
                pValidateId,
                pAuthorisation,
                pLike,
            );


        app.route('/v1/images/:id/dislike')
            .patch(
                pValidateId,
                pAuthorisation,
                pDislike,
            );

    }
}
