import express from 'express';
import OwnerController from '../controllers/ownerController.js';
import authenticate from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/owners', authenticate, OwnerController.getAllEntities, () => {
	/* #swagger.tags = ['Owner']*/
});

router.get('/owners/:id', authenticate, OwnerController.getEntityById, () => {
	/* #swagger.tags = ['Owner']*/
});

router.post('/owners', OwnerController.createEntity, () => {
	/* #swagger.tags = ['Owner']*/
	/* #swagger.security = [] */
});

router.patch('/owners/:id', authenticate, OwnerController.updateEntityData, () => {
	/* #swagger.tags = ['Owner']*/
});

router.post('/ownerLogin', OwnerController.login, () => {
	/* #swagger.tags = ['Owner'] */
	/* #swagger.security = [] */
});

router.delete('/owners/:id', authenticate, OwnerController.deleteEntity, () => {
	/* #swagger.tags = ['Owner']*/
	/* #swagger.responses[204] *
	/* #swagger.responses[400] */
	/* #swagger.responses[500] */
});

export default router;
