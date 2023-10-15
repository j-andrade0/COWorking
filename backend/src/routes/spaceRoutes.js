import express from 'express';
import SpaceController from '../controllers/spaceController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'

const router = express.Router();

router.get('/spaces', authorizationMiddleware, SpaceController.getAllEntities, () => {
	/* #swagger.tags = ['Space']*/
});

router.get('/spaces/:id', authorizationMiddleware, SpaceController.getEntityById, () => {
	/* #swagger.tags = ['Space']*/
});

router.post('/spaces', authorizationMiddleware, SpaceController.createEntity, () => {
	/* #swagger.tags = ['Space']*/
});

router.patch('/spaces/:id', authorizationMiddleware, SpaceController.updateEntity, () => {
	/* #swagger.tags = ['Space']*/
});

router.delete('/spaces/:id', authorizationMiddleware, SpaceController.deleteEntity, () => {
	/* #swagger.tags = ['Space']*/
});

export default router;
