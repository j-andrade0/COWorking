import express from 'express';
import OwnerController from '../controllers/ownerController.js';
import OwnerAuth from '../controllers/auth/ownerAuth.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'


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

// router.put('/owners/:id', OwnerController.updateFullEntity, () => { // must be acessed just by admins
/* #swagger.tags = ['Owner']*/
// });

router.patch('/owners/name/:id', authorizationMiddleware, OwnerController.updateEntityName, () => {
	/* #swagger.tags = ['Owner']*/
});

router.patch('/owners/profilePhoto/:id', authorizationMiddleware, OwnerController.updateEntityProfilePhoto, () => {
	/* #swagger.tags = ['Owner']*/
});

router.patch('/owners/email/:id', authorizationMiddleware, OwnerController.updateEntityEmail, () => {
	/* #swagger.tags = ['Owner']*/
});

router.post('/ownerLogin', OwnerAuth.login, () => {
	/* #swagger.tags = ['Owner'] */
});

export default router;
