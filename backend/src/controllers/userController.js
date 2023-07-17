import Entity from '../models/User.js';
import ValidationError from '../util/ValidationError.js';
import NoEntityError from '../util/NoEntityError.js';

class UserController {
	static getAllEntities = async (req, res) => {
		try {
			const users = await Entity.findAll();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static getEntityById = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (entity) {
				res.status(200).json(entity);
			} else {
				res.status(400).send({
					message: `Id ${req.params.id} not found!`
				});
			}
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static createEntity = async (req, res) => {
		try {
			await Entity.create(req.body);
			res.status(201).send({ message: 'Entity created!' });
		} catch (error) {
			if (error.name == 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Values already registered' });
			} else {
				res.status(500).send({ message: `${error.message}` });
			}
		}
	};

	static updateFullEntity = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body) {
				throw new ValidationError('No body provided!');
			}
			await entity.update(req.body);
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof ValidationError) {
				res.status(400).send({ error: `${error}` });
			} else if (error instanceof NoEntityError) {
				res.status(400).send({ error: `${error}` });
			} else {
				res.status(500).send({ error: `${error}` });
			}
		}
	};

	static updateEntityName = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body.firstName || !req.body.lastName) {
				throw new ValidationError('No name provided!');
			}
			entity.set({
				firstName: req.body.firstName,
				lastName: req.body.lastName
			});
			await entity.save();
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof ValidationError) {
				res.status(400).send({ error: `${error}` });
			} else if (error instanceof NoEntityError) {
				res.status(400).send({ error: `${error}` });
			} else {
				res.status(500).send({ error: `${error}` });
			}
		}
	};

	static updateEntityProfilePhoto = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body.profilePhoto) {
				throw new ValidationError('No path to profile photo provided!');
			}
			entity.set({
				profilePhoto: req.body.profilePhoto
			});
			await entity.save();
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof ValidationError) {
				res.status(400).send({ error: `${error}` });
			} else if (error instanceof NoEntityError) {
				res.status(400).send({ error: `${error}` });
			} else {
				res.status(500).send({ error: `${error}` });
			}
		}
	};

	static updateEntityPassword = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body.password) {
				throw new ValidationError('No password provided!');
			}
			entity.set({
				password: req.body.password
			});
			await entity.save();
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof ValidationError) {
				res.status(400).send({ error: `${error}` });
			} else if (error instanceof NoEntityError) {
				res.status(400).send({ error: `${error}` });
			} else {
				res.status(500).send({ error: `${error}` });
			}
		}
	};

	static updateEntityEmail = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body.email) {
				throw new ValidationError('No email provided!');
			}
			entity.set({
				email: req.body.email
			});
			await entity.save();
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof ValidationError) {
				res.status(400).send({ error: `${error}` });
			} else if (error instanceof NoEntityError) {
				res.status(400).send({ error: `${error}` });
			} else {
				res.status(500).send({ error: `${error}` });
			}
		}
	};

	static deleteEntity = (req, res) => {
		// aply soft delete
	};
}

export default UserController;
