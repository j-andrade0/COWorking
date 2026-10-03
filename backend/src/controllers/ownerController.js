import Entity from '../models/Owner.js';
import MissingBodyError from '../util/customErrors/MissingBodyError.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { buildPagination, paginationParams } from '../util/pagination.js';

class OwnerController {
	static getAllEntities = async (req, res) => {
		const { page, limit, offset } = paginationParams(req.query);

		try {
			const countEntity = await Entity.count();
			const entities = await Entity.findAll({
				order: [['id', 'ASC']],
				offset,
				limit
			});

			entities.forEach((entity) => {
				delete entity.dataValues.password;
			});
			
			const pagination = buildPagination({ path: '/owners', page, limit, total: countEntity });
			res.status(200).json({ entities, pagination });
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static getEntityById = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);

			if (entity) {
				delete entity.dataValues.password;
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
			const { nomeEmpresarial, nomeFantasia, cnpj, email, password, phoneNumber, profilePhoto } = req.body;

			const hashedPassword = await bcrypt.hash(password, 10);

			const createdEntity = await Entity.create({
				nomeEmpresarial,
				nomeFantasia,
				cnpj,
				email,
				password: hashedPassword,
				phoneNumber,
				profilePhoto
			});
			delete createdEntity.dataValues.password;

			res.status(201).send({
				createdEntity
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

			// Only touch the columns that exist and were actually sent (PATCH semantics).
			const fields = ['nomeEmpresarial', 'nomeFantasia', 'profilePhoto', 'email', 'phoneNumber'];
			entity.set(Object.fromEntries(fields.filter((field) => req.body[field] !== undefined).map((field) => [field, req.body[field]])));

			await entity.save();

			delete entity.dataValues.password;
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof MissingBodyError || error instanceof NoEntityError) {
				res.status(400).send({ error: `${error}` });
			} else if (error.name == 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Values already registered' });
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

	static login = async (req, res) => {
		const { email, password } = req.body;

		try {
			const entity = await Entity.findOne({ where: { email: email } });

			if (!entity) {
				throw new NoEntityError('Entity not found');
			}

			const isPasswordValid = await bcrypt.compare(password, entity.password);

			if (isPasswordValid) {
				const jwtToken = jwt.sign({ id: entity.id, role: 'owner' }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

				return res.status(200).json({ jwtToken });
			} else {
				return res.status(401).send({ message: 'Please send the right password and token' });
			}
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	};
}

export default OwnerController;
