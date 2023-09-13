import express from 'express';
import SpaceController from '../controllers/spaceController.js';

const router = express.Router();

router.get('/spaces', SpaceController.getAllEntities, () => {
	/* #swagger.tags = ['Space']*/
});

router.get('/spaces/:id', SpaceController.getEntityById, () => {
	/* #swagger.tags = ['Space']*/
});

router.post('/spaces', SpaceController.createEntity, () => {
	/* #swagger.tags = ['Space']*/
});

router.patch('/spaces/address/:id', SpaceController.updateEntityAddress, () => {
	/* #swagger.tags = ['Space']*/
});

router.patch('/spaces/size/:id', SpaceController.updateEntitySize, () => {
	/* #swagger.tags = ['Space']*/
});

router.patch('/spaces/description/:id', SpaceController.updateEntityDescription, () => {
	/* #swagger.tags = ['Space']*/
});

export default router;
