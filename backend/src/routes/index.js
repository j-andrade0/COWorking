import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import users from './userRoutes.js';
import owners from './ownerRoutes.js'
import swaggerFile from '../../swagger_output.json' assert { type: 'json' };

const routes = (app) => {
	app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
	app.use(express.json(), users);
	app.use(express.json(), owners)
};

export default routes;
