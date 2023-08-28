import express from 'express';
import UserController from '../controllers/userController.js';
import UserAuth from '../controllers/auth/userAuth.js';

const router = express.Router();

router.get('/users', UserController.getAllEntities, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/:id', UserController.getEntityById, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/validateUser', UserController.getEntityByEmail, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.responses[200] */
	/* #swagger.responses[400] */
});

router.post('/users', UserController.createEntity, () => {
	/* #swagger.tags = ['User']*/
});

// router.put('/users/:id', UserController.updateFullEntity, () => { // must be acesses just by admins
/* #swagger.tags = ['User']*/
// });

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

router.patch('users/newSecret', UserAuth.newSecret, () => {
	/* #swagger.tags = ['User'] */
});

router.post('/userLogin', UserAuth.login, () => {
	/* #swagger.tags = ['User'] */
});

// router.delete('/users/:id', UserController.deleteEntity, () => {
/* #swagger.tags = ['User']*/
/* #swagger.responses[200] */
/* #swagger.responses[500] */
// });

export default router;
