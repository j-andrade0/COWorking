import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router
	.get('/users', UserController.getAllUsers)
	.get('/users/:id', UserController.getUserById)
	.post('/users', UserController.createUser)
	.put('/users/:id', UserController.updateUser)
	.delete('/users/:id', UserController.deleteUser);

export default router;
