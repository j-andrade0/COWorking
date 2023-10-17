import User from '../models/User.js';
import Block from '../models/Block.js';
import NoEntityError from './customErrors/NoEntityError.js';
import ValidationError from './customErrors/ValidationError.js';

class ValidateReservation {
	static validateEntity = async (userId, blockId) => {
		try {
			const user = await User.findByPk(userId);
			const block = await Block.findByPk(blockId);

			if (!user || !block) {
				throw new NoEntityError('No entity was found by this id!');
			}

		} catch (error) {
			throw error;
		}
	};

	static compareDate = (startDate, endDate) => {
		if (startDate < endDate) {
			return true
		} else {
			throw new ValidationError('Start Date must be less than End Date')
		}
	}
}

export default ValidateReservation;
