import Entity from '../models/BlockCategory.js';
import ValidationError from '../util/customErrors/ValidationError.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';

class BlockCategoryController {
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
            if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
            }
            res.status(200).json(entity);
		} catch (error) {
            if (error instanceof NoEntityError) {
				res.status(400).send({ error: `${error}` });
			} else{
			    res.status(500).send({ message: `${error.message}` });
            }
		}
	};

	static createEntity = async (req, res) => {
		try {
			const createdEntity = await Entity.create({
				name: req.body.name
			});
			res.status(201).send({
				blockCategory: createdEntity
			});
		} catch (error) {
			if (error.name == 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Values already registered' });
			} else {
				res.status(500).send({ message: `${error.message}` });
			}
		}
	};

	static updateEntityName = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body.name) {
				throw new ValidationError('No name provided!');
			}

			entity.set({
				name: req.body.name,
			});

			await entity.save();
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof ValidationError || error instanceof NoEntityError) {
				res.status(400).send({ error: `${error}` });
			} else {
				res.status(500).send({ error: `${error}` });
			}
		}
	};

	static deleteEntity = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (entity) {
				await entity.destroy();
				return res.status(204).send();
			} else {
				return res.status(400).send({
					message: `Id ${req.params.id} not found!`
				});
			}
		} catch (error) {
			return res.status(500).send({ message: `${error}` });
		}
	};
}

export default BlockCategoryController;
