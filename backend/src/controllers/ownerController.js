import Owner from '../models/Owner.js';
import Entity from '../models/Owner.js'

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
			if (entity) {
				await entity.update(req.body);
				res.status(200).json(entity);
			} else {
				res.status(400).send({ message: `Id ${id} not found!` });
			}
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
			if (entity) {
				entity.set({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					nomeFantasia: req.body.nomeFantasia,
					nomeEmpresarial: req.body.nomeEmpresarial
				});
				await entity.save();
				res.status(200).json(entity);
			} else {
				res.status(400).send({ message: `Id ${id} not found!` });
			}
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static updateEntityProfilePhoto = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (entity) {
				entity.set({
					profilePhoto: req.body.profilePhoto
				});
				await entity.save();
				res.status(200).json(entity);
			} else {
				res.status(400).send({ message: `Id ${id} not found!` });
			}
		} catch (error) {
			if (error.name == 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Values already registered' });
			} else {
				res.status(500).send({ message: `${error.message}` });
			}
		}
	};

	static updateEntityPassword = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (entity) {
				entity.set({
					password: req.body.password
				});
				await entity.save();
				res.status(200).json(entity);
			} else {
				res.status(400).send({ message: `Id ${id} not found!` });
			}
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static updateEntityEmail = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (entity) {
				entity.set({
					email: req.body.email
				});
				await entity.save();
				res.status(200).json(entity);
			} else {
				res.status(400).send({ message: `Id ${id} not found!` });
			}
		} catch (error) {
			if (error.name == 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Values already registered' });
			} else {
				res.status(500).send({ message: `${error.message}` });
			}
		}
	};
}

export default OwnerController;
