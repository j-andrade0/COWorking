import Entity from '../../models/User.js';
import NoEntityError from '../../util/customErrors/NoEntityError.js';
import speakeasy from 'speakeasy';
import jwt from 'jsonwebtoken';

class UserAuth {
	static login = async (req, res) => {
		const userId = req.body.userId;
		const totpToken = req.body.token;
		try {
			const tokenCheckResult = await this.checkToken(userId, totpToken);

			if (tokenCheckResult) {
				const jwtToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
				return res.status(200).json({ jwtToken });
			} else {
				return res.status(401).send({ message: 'Please send the right token' });
			}
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	};

	static checkToken = async (userId, totpToken) => {
		try {
			const entity = await Entity.findByPk(userId);

			if (!entity) {
				throw new NoEntityError('Entity not found');
			}

			const isVerifiedToken = await this.verifyToken(entity, totpToken);
			const isValidToken = this.validateToken(entity, totpToken);

			if (!isVerifiedToken || !isValidToken) {
				return false;
			}

			return true;
		} catch (error) {
			// return false;
			throw new Error(error.message);
		}
	};

	static verifyToken = async (entity, token) => {
		// verify if the token is temporary, if it is, then turns it to permanent. If it is not, just
		// returns that is verified. Returns true or false
		try {
			if (entity.isTempSecret) {
				const secret = entity.secret;

				const verified = speakeasy.totp.verify({
					secret,
					encoding: 'base32',
					token
				});

				if (!verified) {
					return false;
				}

				entity.set({
					isTempSecret: false
				});
				await entity.save();

				return true;
			} else {
				return true;
			}
		} catch {
			throw new Error('Error on verifying');
		}
	};

	static validateToken = (entity, token) => {
		// validate if the token provided is valid, returns true of false
		try {
			const secret = entity.secret;

			const isValidToken = speakeasy.totp.verify({
				secret,
				encoding: 'base32',
				token,
				window: 1
			});

			return isValidToken;
		} catch (error) {
			throw new Error('Error on validating');
		}
	};

	static newSecret = (req, res) => {
		// A user creates a account, but close the app before validating it, in that case, the user don't have a token code in the authenticator app, and needs a new secret.
		// query in the db user table, if the column 'isTempSecret' is true, prove that the user never validate the token.
	};
}
export default UserAuth;
