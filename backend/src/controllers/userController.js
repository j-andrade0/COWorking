import users from '../models/User.js';

class UserController {
	static getAllUsers = (req, res) => {
		users.find((err, users) => {
			if (err) {
				res.status(500).send({ message: err.message });
			} else {
				res.status(200).json(users);
			}
		});
	};

	static getUserById = (req, res) => {
		const id = req.params.id;

		users.findById(id, (err, users) => {
			if (err) {
				res.status(400).send({
					message: `${err.message} - Id not found.`,
				});
			} else {
				res.status(200).send(users);
			}
		});
	};

	static createUser = (req, res) => {
		let user = new users(req.body.id, req.body.name, req.body.cpf, req.body.email, req.body.birthDate, req.body.phoneNumber, req.body.password, req.body.profilePhoto, req.body.balanceAccount);

		user.save((err) => {
			if (err) {
				res.status(500).send({
					message: `${err.message} - Couldn't register User`,
				});
			} else {
				res.status(201).send(user.toJSON());
			}
		});
	};

	static updateUser = (req, res) => {
		const id = req.params.id;

		users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (!err) {
				res.status(200).send({ message: 'User updated!' });
			} else {
				res.status(500).send({ message: err.message });
			}
		});
	};

	// HOW SHOULD WE DELETE A USER?
	static deleteUser = (req, res) => {
		const id = req.params.id;

		users.findByIdAndDelete(id, (err) => {
			if (!err) {
				res.status(200).send({ message: 'User removed' });
			} else {
				res.status(500).send({ message: err.message });
			}
		});
	};
}

export default UserController;
