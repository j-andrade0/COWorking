import express from 'express';
import OwnerController from '../controllers/ownerController.js';

const router = express.Router();

router.get('/owners', OwnerController.getAllEntities, () => {
	/* #swagger.tags = ['Owner']*/
	/* #swagger.responses[200] = { 
		schema: { $ref: "#/definitions/User" },
	} */
	/* #swagger.responses[500]*/
});

router.get('/owners/:id', OwnerController.getEntityById, () => {
	/* #swagger.tags = ['Owner']*/
	/* #swagger.responses[200] = { 
		schema: { $ref: "#/definitions/User" },
	} */
	/* #swagger.responses[400] */
});

router.post('/owners', OwnerController.createEntity, () => {
	/* #swagger.tags = ['Owner']*/
	/* #swagger.parameters['newUser'] = {
		in: 'body',
		description: 'Informações do usuário.',
		required: true,
		schema: { $ref: "#/definitions/CreateUser" }
	} */
	/* #swagger.responses[201] */
	/* #swagger.responses[500] */
});

router.put('/owners/:id', OwnerController.updateFullEntity, () => {
	/* #swagger.tags = ['Owner']*/
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

router.patch('/owners/name/:id', OwnerController.updateEntityName, () => {
	/* #swagger.tags = ['Owner']*/
});

router.patch('/owners/password/:id', OwnerController.updateEntityPassword, () => {
	/* #swagger.tags = ['Owner']*/
});

router.patch('/owners/profilePhoto/:id', OwnerController.updateEntityProfilePhoto, () => {
	/* #swagger.tags = ['Owner']*/
});

router.patch('/owners/email/:id', OwnerController.updateEntityEmail, () => {
	/* #swagger.tags = ['Owner']*/
});

export default router;
