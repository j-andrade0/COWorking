import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const User = db.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		cpf: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING(320),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		// birthDate: {  // problems with formatting
		// 	type: DataTypes.DATEONLY,
		// 	allowNull: false
		// },
		phoneNumber: {
			type: DataTypes.STRING(15),
			allowNull: false,
			unique: true
		},
		profilePhoto: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		balanceAccount: {
			type: DataTypes.DECIMAL(6, 2),
			allowNull: false,
			defaultValue: 0.0
		}
		// add a city relationship
	},
	{
		tableName: 'Users'
	}
);

export default User;
