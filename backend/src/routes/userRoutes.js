import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', UserController.getAllUsers, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.responses[200] = { 
		schema: { $ref: "#/definitions/User" },
	} */
	/* #swagger.responses[500]*/
});

router.get('/users/:id', UserController.getUserById, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.responses[200] = { 
		schema: { $ref: "#/definitions/User" },
	} */
	/* #swagger.responses[400] */
});

router.post('/users', UserController.createUser, () => {
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

router.put('/users/:id', UserController.updateUser, () => {
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
	/* #swagger.responses[500] */
});

router.delete('/users/:id', UserController.deleteUser, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.responses[200] */
	/* #swagger.responses[500] */
});

export default router;
