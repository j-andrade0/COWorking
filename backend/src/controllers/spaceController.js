import Entity from '../models/Space.js';
import ValidationError from '../util/customErrors/ValidationError.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';

class SpaceController {
	static getAllEntities = async (req, res) => {
		try {
			const entities = await Entity.findAll();
			res.status(200).json(entities);
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
			const createdEntity = await Entity.create({
				address: req.body.address,
				rating: null,
				size: req.body.size,
				description: req.body.description
			});
			res.status(201).json(createdEntity);
		} catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Values already registered' });
			} else {
				res.status(500).send({ message: `${error.message}` });
			}
		}
	};

	static updateEntityAddress = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body.address) {
				throw new ValidationError('No address provided!');
			}

			entity.set({
				address: req.body.address
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

	static updateEntitySize = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body.size) {
				throw new ValidationError('No size provided!');
			}

			entity.set({
				size: req.body.size
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

	static updateEntityDescription = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body.description) {
				throw new ValidationError('No description provided!');
			}

			entity.set({
				description: req.body.description
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
}

export default SpaceController;
