class UserAuth {
	static validateToken = (req, res) => {
		// const { userId, token } = req.body;
		// transform a temp_secret into a permanent 'secret', after the user create a account, this is just needed in the first login.
		// query in the db to get the user, if user.isTempSecret is true, turns to false
		// this.verifyToken;
	};

	static newSecret = (req, res) => {
		// A user creates a account, but close the app before validating it, in that case, the user don't have a token code in the authenticator app, and needs a new secret.
		// query in the db user table, if the column 'isTempSecret' is true, prove that the user never validate the token.
	};

	static verifyToken = (req, res) => {
		// verify if the token provided is valid, responses: 200 or 400
	};

	static login = (req, res) => {
		// this.verifyToken
		// add - jwt
	};
}
export default UserAuth;
