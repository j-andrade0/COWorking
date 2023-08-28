import express from 'express';
import OwnerController from '../controllers/ownerController.js';

const router = express.Router();

router.get('/owners', OwnerController.getAllEntities, () => {
	/* #swagger.tags = ['Owner']*/
});

router.get('/owners/:id', OwnerController.getEntityById, () => {
	/* #swagger.tags = ['Owner']*/
});

router.post('/owners', OwnerController.createEntity, () => {
	/* #swagger.tags = ['Owner']*/
});

// router.put('/owners/:id', OwnerController.updateFullEntity, () => { // must be acessed just by admins
	/* #swagger.tags = ['Owner']*/
// });

router.patch('/owners/name/:id', OwnerController.updateEntityName, () => {
	/* #swagger.tags = ['Owner']*/
});

router.patch('/owners/profilePhoto/:id', OwnerController.updateEntityProfilePhoto, () => {
	/* #swagger.tags = ['Owner']*/
});

router.patch('/owners/email/:id', OwnerController.updateEntityEmail, () => {
	/* #swagger.tags = ['Owner']*/
});

export default router;
