import express from 'express';
import OwnerController from '../controllers/ownerController.js';
import OwnerAuth from '../controllers/auth/ownerAuth.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/owners', OwnerController.getAllEntities, () => {
	/* #swagger.tags = ['Owner']*/
});

router.get('/owners/:id', authorizationMiddleware, OwnerController.getEntityById, () => {
	/* #swagger.tags = ['Owner']*/
});

router.post('/owners', OwnerController.createEntity, () => {
	/* #swagger.tags = ['Owner']*/
});

 router.patch('/owners/:id', authorizationMiddleware, OwnerController.updateEntityData, () => {
/* #swagger.tags = ['Owner']*/
});

router.post('/ownerLogin', OwnerAuth.login, () => {
	/* #swagger.tags = ['Owner'] */
});

router.delete('/owners/:id', OwnerController.deleteEntity, () => {
	/* #swagger.tags = ['Owner']*/
	/* #swagger.responses[204] *
	/* #swagger.responses[400] */
	/* #swagger.responses[500] */
});

export default router;
