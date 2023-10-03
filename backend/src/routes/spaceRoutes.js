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

router.patch('/spaces/address/:id', authorizationMiddleware, SpaceController.updateEntityAddress, () => {
	/* #swagger.tags = ['Space']*/
});

router.patch('/spaces/size/:id', authorizationMiddleware, SpaceController.updateEntitySize, () => {
	/* #swagger.tags = ['Space']*/
});

router.patch('/spaces/description/:id', authorizationMiddleware, SpaceController.updateEntityDescription, () => {
	/* #swagger.tags = ['Space']*/
});

export default router;
