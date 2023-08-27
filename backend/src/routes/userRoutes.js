import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', UserController.getAllEntities, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.responses[200] = { 
		schema: { $ref: "#/definitions/User" },
	} */
	/* #swagger.responses[500]*/
});

router.get('/users/:id', UserController.getEntityById, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.responses[200] = { 
		schema: { $ref: "#/definitions/User" },
	} */
	/* #swagger.responses[400] */
});

router.get('/users/validateUser', UserController.getEntityByEmail, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.responses[200] */
	/* #swagger.responses[400] */
});

router.post('/users', UserController.createEntity, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.parameters['newUser'] = {
		in: 'body',
		description: 'Informações do usuário.',
		required: true,
		schema: { $ref: "#/definitions/CreateUser" }
	} */
	/* #swagger.responses[201] */
	/* #swagger.responses[500] */
});

router.put('/users/:id', UserController.updateFullEntity, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.parameters['id'] = {
		"in": "path",
		"required": true,
		"type": "string"
	  }
	  */
	/* #swagger.parameters['newUser'] = {
		in: 'body',
		description: 'Update Users information.',
		required: true,
		schema: { $ref: "#/definitions/UpdateUser" }
	} 
	*/
	/* #swagger.responses[200] */
	/*#swagger.responses[400]*/
	/* #swagger.responses[500] */
});

router.patch('/users/name/:id', UserController.updateEntityName, () => {
	/* #swagger.tags = ['User']*/
});

router.patch('/users/password/:id', UserController.updateEntityPassword, () => {
	/* #swagger.tags = ['User']*/
});

router.patch('/users/profilePhoto/:id', UserController.updateEntityProfilePhoto, () => {
	/* #swagger.tags = ['User']*/
});

router.patch('/users/email/:id', UserController.updateEntityEmail, () => {
	/* #swagger.tags = ['User']*/
});

router.delete('/users/:id', UserController.deleteEntity, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.responses[200] */
	/* #swagger.responses[500] */
});

export default router;
