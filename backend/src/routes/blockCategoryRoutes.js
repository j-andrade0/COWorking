import express from 'express';
import BlockCategoryController from '../controllers/blockCategoryController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'

const router = express.Router();

router.get('/blockCategory', BlockCategoryController.getAllEntities, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.get('/blockCategory/:id', BlockCategoryController.getEntityById, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.post('/blockCategory', BlockCategoryController.createEntity, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

router.put('/blockCategory/:id', BlockCategoryController.updateEntityName, () => {
    /* #swagger.tags = ['BlockCategory']*/
})

router.delete('/blockCategory/:id', BlockCategoryController.deleteEntity, () => {
	/* #swagger.tags = ['BlockCategory']*/
});

export default router;
