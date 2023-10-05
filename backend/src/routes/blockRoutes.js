import express from 'express';
import Block from '../controllers/blockController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'

const router = express.Router();

router.get('/block', Block.getAllEntities, () => {
	/* #swagger.tags = ['Block']*/
});

router.get('/block/:id', Block.getEntityById, () => {
	/* #swagger.tags = ['Block']*/
});

router.post('/block', Block.createEntity, () => {
	/* #swagger.tags = ['Block']*/
});

router.put('/block/:id', Block.updateEntityData, () => {
    /* #swagger.tags = ['Block']*/
})

router.delete('/block/:id', Block.deleteEntity, () => {
	/* #swagger.tags = ['Block']*/
});

export default router;
