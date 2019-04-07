import express = require('express');
import { LoginRoute } from './v1/login-route';
import { AuthMiddleware } from '../../middlewares/auth-middleware';


export const apiRoutes = express();


new LoginRoute().routes(apiRoutes);

new AuthMiddleware().routes(apiRoutes);
