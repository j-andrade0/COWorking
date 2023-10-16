import Entity from '../models/Block.js';
import MissingBodyError from '../util/customErrors/MissingBodyError.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';
import Reservations from '../models/BlockReservation.js'


class BlockController {
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
			} else {
				res.status(500).send({ message: `${error.message}` });
			}
		}
	};

	static createEntity = async (req, res) => {
		try {
			const createdEntity = await Entity.create({
				name: req.body.name,
				peopleLimit: req.body.peopleLimit,
				description: req.body.description,
				spaceId: req.body.spaceId,
				blockCategoryId: req.body.blockCategoryId
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

	static updateEntityData = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);

			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body) {
				throw new MissingBodyError('No body provided!');
			}

			entity.set({
				name: req.body.name,
				peopleLimit: req.body.peopleLimit,
				description: req.body.description
			});

			await entity.save();
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof MissingBodyError || error instanceof NoEntityError) {
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

	static getReservations = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			
			const reservations = await Reservations.findAll({
				where: {
					blockId: req.params.id
				}
			});

			return res.status(200).send(reservations)
		} catch (error) {
			if (error instanceof MissingBodyError) {
				res.status(400).send({ error: `${error}` });
			}
			return res.status(500).send({ message: `${error}` });
		}
	};
}

export default BlockController;
