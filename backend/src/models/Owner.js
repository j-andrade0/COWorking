import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Owner = db.define('Owner', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	nomeEmpresarial: {
		type: DataTypes.STRING,
		allowNull: false
	},
	nomeFantasia: {
		type: DataTypes.STRING,
		allowNull: false
	},
	cnpj: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING(64),
		allowNull: false
	},
	phoneNumber: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	profilePhoto: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: true
	},
    // add bankAccount Relationship
});
export default Owner;
