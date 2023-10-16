class MissingBodyError extends Error {
	constructor(message) {
		super(message);
		this.name = 'MissingBodyError';
	}
}

export default MissingBodyError;
