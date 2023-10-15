import Entity from '../models/Owner.js';
import ValidationError from '../util/customErrors/ValidationError.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';
import speakeasy from 'speakeasy';

class OwnerController {
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
			const temp_secret = speakeasy.generateSecret();
			const createdEntity = await Entity.create({
				nomeEmpresarial: req.body.nomeEmpresarial,
				nomeFantasia: req.body.nomeFantasia,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				document: req.body.document,
				email: req.body.email,
				secret: temp_secret.base32,
				isTempSecret: true,
				phoneNumber: req.body.phoneNumber,
				profilePhoto: req.body.profilePhoto
			});
			res.status(201).send({
				userId: createdEntity.id,
				qrCodeUrl: `${temp_secret.otpauth_url}`
			});
		} catch (error) {
			if (error.name == 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Values already registered' });
			} else {
				res.status(500).send({ message: `${error.message}` });
			}
		}
	};

	static updateEntity = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}
			if (!req.body) {
				throw new ValidationError('No body provided!');
			}

			entity.set({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				nomeFantasia: req.body.nomeFantasia,
				nomeEmpresarial: req.body.nomeEmpresarial,
				profilePhoto: req.body.profilePhoto,
				email: req.body.email,
				phoneNumber: req.body.phoneNumber
			});

			await entity.save();
			res.status(200).json(entity);
		} catch (error) {
			if (error instanceof ValidationError) {
				res.status(400).send({ error: `${error}` });
			} else if (error instanceof NoEntityError) {
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
}

export default OwnerController;
