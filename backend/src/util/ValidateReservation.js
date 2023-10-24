import User from '../models/User.js';
import Block from '../models/Block.js';
import NoEntityError from './customErrors/NoEntityError.js';
import ValidationError from './customErrors/ValidationError.js';
import Reservations from '../models/BlockReservation.js';

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
			return true;
		} else {
			throw new ValidationError('Start Date must be less than End Date');
		}
	};

	static isValidSchedule = async (blockId, startDate, endDate) => {
		const reservations = await Reservations.findAll({
			where: {
				blockId: blockId
			}
		});

		for (const reserve of reservations) {
			const convertedStartDate = this.convertGMTDate(reserve.startDate);
			const convertedEndDate = this.convertGMTDate(reserve.endDate);
			
			if (
				(startDate >= convertedStartDate && startDate < convertedEndDate) ||
				(endDate > convertedStartDate && endDate <= convertedEndDate) ||
				(startDate <= convertedStartDate && endDate >= convertedEndDate)
			) {
				throw new ValidationError('Time already booked');
			}
		}
		return true;
	};

	static convertGMTDate = (dateToBeConverted) => {
		const gmtTime = new Date(dateToBeConverted);
		gmtTime.setHours(gmtTime.getHours());
		return gmtTime.toISOString();
	};
}

export default ValidateReservation;
