import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';
// need to review names
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
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	document: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
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
