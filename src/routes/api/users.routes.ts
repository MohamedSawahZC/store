import { Router, Request, Response } from 'express';
import * as controllers from '../../controller/users.controller';

const routes = Router();

routes.get('/', controllers.get);

routes.post('/create', controllers.create);

export default routes;
