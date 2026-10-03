import express from 'express';
import Block from '../controllers/blockController.js';
import authenticate from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/block', authenticate, Block.getAllEntities, () => {
	/* #swagger.tags = ['Block']*/
});

router.get('/block/:id', authenticate, Block.getEntityById, () => {
	/* #swagger.tags = ['Block']*/
});

router.post('/block', authenticate, Block.createEntity, () => {
	/* #swagger.tags = ['Block']*/
});

router.patch('/block/:id', authenticate, Block.updateEntityData, () => {
	/* #swagger.tags = ['Block']*/
});

router.delete('/block/:id', authenticate, Block.deleteEntity, () => {
	/* #swagger.tags = ['Block']*/
});

router.get('/block/reservations/:id', authenticate, Block.getReservations, () => {
	/* #swagger.tags = ['Block']*/
});

export default router;
