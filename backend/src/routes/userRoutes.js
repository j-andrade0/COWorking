import express from 'express';
import UserController from '../controllers/userController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/users', UserController.getAllEntities, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/:id', authorizationMiddleware, UserController.getEntityById, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/validateUser', UserController.getEntityByEmail, () => {
	/* #swagger.tags = ['User']*/
});

router.post('/users', UserController.createEntity, () => {
	/* #swagger.tags = ['User']*/
});

router.patch('/users/:id', authorizationMiddleware, UserController.updateEntityData, () => {
	/* #swagger.tags = ['User']*/
});

router.post('/userLogin', UserController.login, () => {
	/* #swagger.tags = ['User'] */
});

router.delete('/users/:id', UserController.deleteEntity, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/users/reservations/:id', authorizationMiddleware, UserController.getReservations, () => {
	/* #swagger.tags = ['User']*/
});

export default router;
