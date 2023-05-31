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
					message: `Id ${req.params.id} not found!`,
				});
			}
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static createUser = async (req, res) => {
		try {
			await User.create(req.body);
			res.status(201).send({ message: "Entity created!"});
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static updateUser = async (req, res) => {
		try {
			const entity = User.findByPk(req.params.id);
			await entity.updateUser(req.body)
			await entity.save() // not working yet

		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	// HOW SHOULD WE DELETE A USER?
	static deleteUser = (req, res) => {
		// 	const id = req.params.id;
		// 	users.findByIdAndDelete(id, (err) => {
		// 		if (!err) {
		// 			res.status(200).send({ message: 'User removed' });
		// 		} else {
		// 			res.status(500).send({ message: err.message });
		// 		}
		// 	});
	};
}

export default UserController;
