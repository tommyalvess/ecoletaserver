import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsControllers from './controllers/PointsControllers';
import ItemsControllers from './controllers/ItemsControllers';

const routes = express.Router();

const upload = multer(multerConfig);

const pointsControllers = new PointsControllers();
const itemsControllers = new ItemsControllers();

//Opção para o controllers: index, show(retorna unico registro), create, update, delete

routes.get('/items', itemsControllers.index);

routes.post('/points', upload.single('image'), pointsControllers.create);
routes.get('/points', pointsControllers.index);
routes.get('/points/:id', pointsControllers.show);

export default routes;