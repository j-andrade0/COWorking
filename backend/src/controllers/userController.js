import Entity from '../models/User.js';
import ValidationError from '../util/customErrors/ValidationError.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';
import speakeasy from 'speakeasy';
import jwtLib from 'jsonwebtoken';

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
		const jwt = req.header('Authorization');

		if (!jwt) {
			return res.status(400).json({ message: 'Missing jwt authentication' });
		}

		try {
			jwtLib.verify(jwt, process.env.JWT_SECRET_KEY); // throws a JsonWebTokenError if it is not valid

			const entity = await Entity.findByPk(req.params.id);
			if (entity) {
				return res.status(200).json(entity);
			} else {
				return res.status(400).send({
					message: `Id ${req.params.id} not found!`
				});
			}
		} catch (error) {
			if (error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError') {
				return res.status(401).send({ unauthorized: `${error.message}` });
			}
			return res.status(500).send({ message: `${error}` });
		}
	};

	static getEntityByEmail = async (req, res) => {
		try {
			const entity = await Entity.findOne({ where: { email: req.body.email} });
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

	static updateFullEntity = async (req, res) => {
		const jwt = req.header('Authorization');

		if (!jwt) {
			return res.status(400).json({ message: 'Missing jwt authentication' });
		}

		try {
			jwtLib.verify(jwt, process.env.JWT_SECRET_KEY); // throws a JsonWebTokenError if it is not valid

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
			if (error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError') {
				return res.status(401).send({ unauthorized: `${error.message}` });
			}
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

	static updateEntityName = async (req, res) => {
		const jwt = req.header('Authorization');

		if (!jwt) {
			return res.status(400).json({ message: 'Missing jwt authentication' });
		}

		try {
			jwtLib.verify(jwt, process.env.JWT_SECRET_KEY); // throws a JsonWebTokenError if it is not valid

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
			if (error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError') {
				return res.status(401).send({ unauthorized: `${error.message}` });
			}
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
		const jwt = req.header('Authorization');

		if (!jwt) {
			return res.status(400).json({ message: 'Missing jwt authentication' });
		}

		try {
			jwtLib.verify(jwt, process.env.JWT_SECRET_KEY); // throws a JsonWebTokenError if it is not valid

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
			if (error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError') {
				return res.status(401).send({ unauthorized: `${error.message}` });
			}
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
		const jwt = req.header('Authorization');

		if (!jwt) {
			return res.status(400).json({ message: 'Missing jwt authentication' });
		}

		try {
			jwtLib.verify(jwt, process.env.JWT_SECRET_KEY); // throws a JsonWebTokenError if it is not valid

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
			if (error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError') {
				return res.status(401).send({ unauthorized: `${error.message}` });
			}
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

	static deleteEntity = (req, res) => {
		// aply soft delete
	};
}

export default UserController;
