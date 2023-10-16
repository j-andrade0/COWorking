import express from 'express';
import Block from '../controllers/blockController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'

const router = express.Router();

router.get('/block', authorizationMiddleware, Block.getAllEntities, () => {
	/* #swagger.tags = ['Block']*/
});

router.get('/block/:id', authorizationMiddleware, Block.getEntityById, () => {
	/* #swagger.tags = ['Block']*/
});

router.post('/block', authorizationMiddleware, Block.createEntity, () => {
	/* #swagger.tags = ['Block']*/
});

router.patch('/block/:id', authorizationMiddleware, Block.updateEntityData, () => {
    /* #swagger.tags = ['Block']*/
})

router.delete('/block/:id', authorizationMiddleware, Block.deleteEntity, () => {
	/* #swagger.tags = ['Block']*/
});

router.get('/block/reservations/:id', authorizationMiddleware, Block.getReservations, () => {
	/* #swagger.tags = ['Block']*/
});

export default router;
