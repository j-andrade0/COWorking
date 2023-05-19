import users from '../models/User.js';

class UserController {
	static getAllUsers = (req, res) => {
		/* #swagger.tags = ['User']*/
		users.find((err, users) => {
			if (err) {
				res.status(500).send({ message: err.message });
			} else {
				/* #swagger.responses[200] = { 
					schema: { $ref: "#/definitions/User" },
					description: 'Usuário encontrado.' 
        		} */
				res.status(200).json(users);
			}
		});
	};

	static getUserById = (req, res) => {
		/* #swagger.tags = ['User']*/

		const id = req.params.id;

		users.findById(id, (err, users) => {
			if (err) {
				res.status(400).send({
					message: `${err.message} - Id not found.`,
				});
			} else {
				/* #swagger.responses[200] = { 
               		schema: { $ref: "#/definitions/User" },
        		} */
				res.status(200).send(users);
			}
		});
	};

	static createUser = (req, res) => {
		/* #swagger.tags = ['User']*/

		let user = new users(req.body);

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
		/* #swagger.tags = ['User']*/
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
		/* #swagger.tags = ['User']*/
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
