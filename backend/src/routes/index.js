import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import users from './userRoutes.js';
import owners from './ownerRoutes.js'
import spaces from './spaceRoutes.js';
import swaggerFile from '../../swagger/swagger_output.json' assert { type: 'json' };
import blockCategory from './blockCategoryRoutes.js'
import block from './blockRoutes.js'

const routes = (app) => {
	app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
	app.use(express.json(), users);
	app.use(express.json(), owners)
	app.use(express.json(), spaces)
	app.use(express.json(), blockCategory)
	app.use(express.json(), block)
};

export default routes;
