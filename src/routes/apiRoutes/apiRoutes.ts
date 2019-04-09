import express = require('express');
import { LoginRoute } from './v1/login-route';
import { ImagesRoute } from './v1/images-route';
import { AuthMiddleware } from '../../middlewares/auth-middleware';


export const apiRoutes = express();


new LoginRoute().routes(apiRoutes);
new ImagesRoute().routes(apiRoutes);

new AuthMiddleware().routes(apiRoutes);
