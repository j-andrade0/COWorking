import express from 'express';
import BlockReservationController from '../controllers/blockReservationController.js';
import authenticate from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/blockReservation', authenticate, BlockReservationController.getAllEntities, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

router.get('/blockReservation/:id', authenticate, BlockReservationController.getEntityById, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

router.post('/blockReservation', authenticate, BlockReservationController.createEntity, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

router.patch('/blockReservation/:id', authenticate, BlockReservationController.updateEntityData, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

router.delete('/blockReservation/:id', authenticate, BlockReservationController.deleteEntity, () => {
	/* #swagger.tags = ['BlockReservation']*/
});

export default router;
