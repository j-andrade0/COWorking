import express from 'express';
import BlockReservationController from '../controllers/blockReservationController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/blockReservation', authorizationMiddleware, BlockReservationController.getAllEntities, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

router.get('/blockReservation/:id', authorizationMiddleware, BlockReservationController.getEntityById, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

router.post('/blockReservation', authorizationMiddleware, BlockReservationController.createEntity, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

router.patch('/blockReservation/:id', authorizationMiddleware, BlockReservationController.updateEntityData, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

router.delete('/blockReservation/:id', authorizationMiddleware, BlockReservationController.deleteEntity, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

export default router;
