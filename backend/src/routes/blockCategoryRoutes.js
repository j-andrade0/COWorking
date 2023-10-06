import express from 'express';
import BlockCategoryController from '../controllers/blockCategoryController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'

const router = express.Router();

router.get('/blockCategory', authorizationMiddleware, BlockCategoryController.getAllEntities, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.get('/blockCategory/:id', authorizationMiddleware, BlockCategoryController.getEntityById, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.post('/blockCategory', authorizationMiddleware, BlockCategoryController.createEntity, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.put('/blockCategory/:id', authorizationMiddleware, BlockCategoryController.updateEntityName, () => {
    /* #swagger.tags = ['BlockCategory']*/
})

router.delete('/blockCategory/:id', authorizationMiddleware, BlockCategoryController.deleteEntity, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

export default router;
