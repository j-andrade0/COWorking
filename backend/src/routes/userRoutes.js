import express from 'express';
import UserController from '../controllers/userController.js';
import UserAuth from '../controllers/auth/userAuth.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'

const router = express.Router();

router.get('/users', UserController.getAllEntities, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/:id', authorizationMiddleware, UserController.getEntityById, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/validateUser', UserController.getEntityByEmail, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.responses[201] */
	/* #swagger.responses[500] */
});

router.post('/users', UserController.createEntity, () => {
	/* #swagger.tags = ['User']*/
});

// router.put('/users/:id', authorizationMiddleware, UserController.updateFullEntity, () => { // must be acesses just by admins
/* #swagger.tags = ['User']*/
// });

router.patch('/users/name/:id', authorizationMiddleware, UserController.updateEntityName, () => {
	/* #swagger.tags = ['User']*/
});

router.patch('/users/profilePhoto/:id', authorizationMiddleware, UserController.updateEntityProfilePhoto, () => {
	/* #swagger.tags = ['User']*/
});

router.patch('/users/email/:id', authorizationMiddleware, UserController.updateEntityEmail, () => {
	/* #swagger.tags = ['User']*/
});

router.post('/users/newSecret/:id', UserAuth.newSecret, () => {
	/* #swagger.tags = ['User'] */
});

router.post('/userLogin', UserAuth.login, () => {
	/* #swagger.tags = ['User'] */
});


router.delete('/users/:id', UserController.deleteEntity, () => {
/* #swagger.tags = ['User']*/
/* #swagger.responses[204] *
/* #swagger.responses[400] */
/* #swagger.responses[500] */
});

export default router;
