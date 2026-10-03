import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';
import Block from './Block.js';
import User from './User.js';

const BlockReservation = db.define(
	'BlockReservation',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		tableName: 'BlockReservation'
	}
);

Block.hasMany(BlockReservation, {
	foreignKey: 'blockId',
	onDelete: 'set Null'
});

User.hasMany(BlockReservation, {
	foreignKey: 'userId',
	onDelete: 'set Null'
});

export default BlockReservation;
