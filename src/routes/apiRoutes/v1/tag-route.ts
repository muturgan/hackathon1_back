import { Express } from 'express';
import {
    pAddTag,
    pDeleteTag,
    pValidateId,
    pAuthorisation,
        } from '../../../providers';


export class TagRoute {

    public routes(app: Express): void {

        app.route('/v1/images/:id/addTag')
            .patch(
                pValidateId,
                pAuthorisation,
                pAddTag,
            );


        app.route('/v1/images/:id/deleteTag')
            .patch(
                pValidateId,
                pAuthorisation,
                pDeleteTag,
            );

    }
}
