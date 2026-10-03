import { Op } from 'sequelize';
import User from '../models/User.js';
import Block from '../models/Block.js';
import NoEntityError from './customErrors/NoEntityError.js';
import ValidationError from './customErrors/ValidationError.js';
import Reservations from '../models/BlockReservation.js';

class ValidateReservation {
	static validateEntity = async (userId, blockId) => {
		const user = await User.findByPk(userId);
		const block = await Block.findByPk(blockId);

		if (!user || !block) {
			throw new NoEntityError('No entity was found by this id!');
		}
	};

	// Parses what the client sent. Everything is compared as Date, so mixed formats and UTC offsets
	// ("...T09:00:00-03:00" vs "...T10:00:00.000Z") are handled.
	static parseDate = (value, name) => {
		const date = new Date(value);
		if (value === undefined || value === null || Number.isNaN(date.getTime())) {
			throw new ValidationError(`${name} must be a valid date`);
		}
		return date;
	};

	static compareDate = (startDate, endDate) => {
		const start = this.parseDate(startDate, 'Start Date');
		const end = this.parseDate(endDate, 'End Date');

		if (start < end) {
			return true;
		} else {
			throw new ValidationError('Start Date must be less than End Date');
		}
	};

	// `ignoreReservationId` lets an update skip the reservation being edited, otherwise it would
	// always collide with itself.
	static isValidSchedule = async (blockId, startDate, endDate, ignoreReservationId = null) => {
		const start = this.parseDate(startDate, 'Start Date');
		const end = this.parseDate(endDate, 'End Date');

		const where = { blockId };
		if (ignoreReservationId !== null) {
			where.id = { [Op.ne]: ignoreReservationId };
		}
		const reservations = await Reservations.findAll({ where });

		for (const reserve of reservations) {
			const reservedStart = new Date(reserve.startDate);
			const reservedEnd = new Date(reserve.endDate);

			if (
				(start >= reservedStart && start < reservedEnd) || // starts inside an existing reservation
				(end > reservedStart && end <= reservedEnd) || // ends inside an existing reservation
				(start <= reservedStart && end >= reservedEnd) // wraps an existing reservation
			) {
				throw new ValidationError('Time already booked');
			}
		}
		return true;
	};
}

export default ValidateReservation;
