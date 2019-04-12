import express = require('express');
import { LoginRoute } from './v1/login-route';
import { ImagesRoute } from './v1/images-route';


export const apiRoutes = express();


new LoginRoute().routes(apiRoutes);
new ImagesRoute().routes(apiRoutes);
