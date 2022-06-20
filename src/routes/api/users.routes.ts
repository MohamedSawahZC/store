import { Router, Request, Response } from 'express';
import * as controllers from '../../controller/users.controller';

const routes = Router();

routes.get('/', controllers.get);

routes.get('/all', controllers.getMany);

routes.get('/:id', controllers.getOne);

routes.post('/create', controllers.create);

routes.patch('/:id', controllers.updateOne);

routes.delete('/:id', controllers.deleteOne);

routes.post('/login', controllers.authenticate);

export default routes;
