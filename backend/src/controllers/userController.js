import Entity from '../models/User.js';
import MissingBodyError from '../util/customErrors/MissingBodyError.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';
import speakeasy from 'speakeasy';
import Reservations from '../models/BlockReservation.js';

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
				return res.status(200).json(entity);
			} else {
				return res.status(400).send({
					message: `Id ${req.params.id} not found!`
				});
			}
		} catch (error) {
			return res.status(500).send({ message: `${error}` });
		}
	};

	static getEntityByEmail = async (req, res) => {
		try {
			const entity = await Entity.findOne({ where: { email: req.body.email } });
			if (entity) {
				res.status(200).json(entity);
			} else {
				res.status(400).send({
					message: `Email ${req.body.email} not found!`
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
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				cpf: req.body.cpf,
				email: req.body.email,
				secret: temp_secret.base32,
				isTempSecret: true,
				// birthDate: req.body.birthDate, //problems with formatting
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
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				profilePhoto: req.body.profilePhoto,
				email: req.body.email,
				phoneNumber: req.body.phoneNumber
			});

			await entity.save();
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

	static getReservations = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (!entity) {
				throw new NoEntityError('No entity was found by this id!');
			}

			const reservations = await Reservations.findAll({
				where: {
					userId: req.params.id
				}
			});

			return res.status(200).send(reservations)
		} catch (error) {
			if (error instanceof NoEntityError) {
				res.status(400).send({ error: `${error}` });
			}
			return res.status(500).send({ message: `${error}` });
		}
	};
}

export default UserController;
