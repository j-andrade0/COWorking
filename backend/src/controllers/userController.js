import User from '../models/User.js';

class UserController {
	static getAllUsers = async (req, res) => {
		try {
			const users = await User.findAll();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static getUserById = async (req, res) => {
		try {
			const entity = await User.findByPk(req.params.id);
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

	static createUser = async (req, res) => {
		try {
			await User.create(req.body);
			res.status(201).send({ message: 'Entity created!' });
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static updateUser = async (req, res) => {
		try {
			const entity = await User.findByPk(req.params.id);
			if (entity) {
				await entity.update(req.body);
				res.status(200).json(entity);
			} else {
				res.status(400).send({ message: `Id ${id} not found!` });
			}
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static deleteUser = (req, res) => {
		// aply soft delete
	};
}

export default UserController;
