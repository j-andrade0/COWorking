import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const BlockCategory = db.define(
	'BlockCategory',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
            unique: true
		}
	},
	{
		tableName: 'BlockCategories'
	}
);

export default BlockCategory;
