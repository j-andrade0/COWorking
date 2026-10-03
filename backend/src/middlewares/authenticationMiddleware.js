import jwtLib from 'jsonwebtoken';

// Accepts the raw token or "Bearer <token>" in the Authorization header.
function extractToken(req) {
	const header = req.header('Authorization');
	if (!header) {
		return null;
	}
	return header.startsWith('Bearer ') ? header.slice(7).trim() : header.trim();
}

function authenticate(req, res, next) {
	const token = extractToken(req);

	if (!token) {
		return res.status(401).json({ message: 'Unsent token!' });
	}

	try {
		req.auth = jwtLib.verify(token, process.env.JWT_SECRET_KEY); // throws a JsonWebTokenError if it is not valid
		return next();
	} catch (error) {
		// Invalid, expired or any unexpected failure: never leave the request hanging.
		const message = error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' ? error.message : 'Unauthorized';
		return res.status(401).send({ unauthorized: message });
	}
}

export default authenticate;
