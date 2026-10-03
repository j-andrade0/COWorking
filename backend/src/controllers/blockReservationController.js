import Entity from '../models/BlockReservation.js';
import MissingBodyError from '../util/customErrors/MissingBodyError.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';
import ValidationError from '../util/customErrors/ValidationError.js';
import ValidateReservation from '../util/ValidateReservation.js';
import { buildPagination, paginationParams } from '../util/pagination.js';

class BlockReservationController {
	static getAllEntities = async (req, res) => {
		const { page, limit, offset } = paginationParams(req.query);

		try {
			const countEntity = await Entity.count();
			const entities = await Entity.findAll({
				order: [['id', 'ASC']],
				offset,
				limit
			});

			const pagination = buildPagination({ path: '/blockReservation', page, limit, total: countEntity });
			return res.status(200).json({ entities, pagination });
		} catch (error) {
			return res.status(500).send({ message: `${error.message}` });
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
			const { startDate, endDate, userId, blockId } = req.body;

			await ValidateReservation.validateEntity(userId, blockId);
			ValidateReservation.compareDate(startDate, endDate);
			await ValidateReservation.isValidSchedule(blockId, startDate, endDate);

			const createdEntity = await Entity.create({
				startDate: startDate,
				endDate: endDate,
				userId: userId,
				blockId: blockId
			});

			res.status(201).send({
				blockReservation: createdEntity
			});
		} catch (error) {
			if (error.name == 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Values already registered' });
			} else if (error instanceof ValidationError || error instanceof NoEntityError) {
				res.status(400).send({ message: error.message });
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
				throw new MissingBodyError('No data provided!');
			}

			const startDate = req.body.startDate ?? entity.startDate;
			const endDate = req.body.endDate ?? entity.endDate;

			ValidateReservation.compareDate(startDate, endDate);
			await ValidateReservation.isValidSchedule(entity.blockId, startDate, endDate, entity.id);

			entity.set({ startDate, endDate });

			await entity.save();
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof MissingBodyError || error instanceof NoEntityError || error instanceof ValidationError) {
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

export default BlockReservationController;
