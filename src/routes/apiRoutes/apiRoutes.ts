import express = require('express');
import { LoginRoute } from './v1/login-route';
import { ImagesRoute } from './v1/images-route';
import { LikesRoute } from './v1/like-route';
import { TagRoute } from './v1/tag-route';


export const apiRoutes = express();


new LoginRoute().routes(apiRoutes);
new ImagesRoute().routes(apiRoutes);
new LikesRoute().routes(apiRoutes);
new TagRoute().routes(apiRoutes);
