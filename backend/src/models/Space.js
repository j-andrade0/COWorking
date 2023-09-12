import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Space = db.define(
	'Space',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		rating: {
			type: DataTypes.STRING,
			allowNull: true
		},
		size: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		tableName: 'Spaces'
	}
);

export default Space;
