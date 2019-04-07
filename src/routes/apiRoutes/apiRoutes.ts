import express = require('express');
import { AdminLoginRoutesv1 } from './v1/admin-login-route-v2';
import { AdminAuthMiddleware } from '../middlewares/admin-auth-middleware';
import { AdminfieldsValidationMiddleware } from '../middlewares/admin-fields-validation-middleware';
import { OfficersAdminRoutesv1 } from './v1/officers-routes-v2';
import { ProjectsAdminRoutesv1 } from './v1/projects-routes-v2';


export const adminApi = express();


new AdminLoginRoutesv1().routes(adminApi);

new AdminAuthMiddleware().routes(adminApi);
new AdminfieldsValidationMiddleware().routes(adminApi);

new OfficersAdminRoutesv1().routes(adminApi);
new ProjectsAdminRoutesv1().routes(adminApi);
