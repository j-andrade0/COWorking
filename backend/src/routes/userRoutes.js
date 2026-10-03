import express from 'express';
import UserController from '../controllers/userController.js';
import authenticate from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/users', authenticate, UserController.getAllEntities, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/validateUser', authenticate, UserController.getEntityByEmail, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/:id', authenticate, UserController.getEntityById, () => {
	/* #swagger.tags = ['User']*/
});

router.post('/users', UserController.createEntity, () => {
	/* #swagger.tags = ['User']*/
	/* #swagger.security = [] */
});

router.patch('/users/:id', authenticate, UserController.updateEntityData, () => {
	/* #swagger.tags = ['User']*/
});

router.post('/userLogin', UserController.login, () => {
	/* #swagger.tags = ['User'] */
	/* #swagger.security = [] */
});

router.delete('/users/:id', authenticate, UserController.deleteEntity, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/reservations/:id', authenticate, UserController.getReservations, () => {
	/* #swagger.tags = ['User']*/
});

export default router;
