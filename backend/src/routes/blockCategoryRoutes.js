import express from 'express';
import BlockCategoryController from '../controllers/blockCategoryController.js';
import authenticate from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/blockCategory', authenticate, BlockCategoryController.getAllEntities, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.get('/blockCategory/:id', authenticate, BlockCategoryController.getEntityById, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.post('/blockCategory', authenticate, BlockCategoryController.createEntity, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.patch('/blockCategory/:id', authenticate, BlockCategoryController.updateEntityData, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.delete('/blockCategory/:id', authenticate, BlockCategoryController.deleteEntity, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

export default router;
