import express from 'express';
import SpaceController from '../controllers/spaceController.js';
import authenticate from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/spaces', authenticate, SpaceController.getAllEntities, () => {
	/* #swagger.tags = ['Space']*/
});

router.get('/spaces/:id', authenticate, SpaceController.getEntityById, () => {
	/* #swagger.tags = ['Space']*/
});

router.post('/spaces', authenticate, SpaceController.createEntity, () => {
	/* #swagger.tags = ['Space']*/
});

router.patch('/spaces/:id', authenticate, SpaceController.updateEntityData, () => {
	/* #swagger.tags = ['Space']*/
});

router.delete('/spaces/:id', authenticate, SpaceController.deleteEntity, () => {
	/* #swagger.tags = ['Space']*/
});

export default router;
