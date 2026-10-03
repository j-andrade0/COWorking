import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';
import Space from './Space.js';
import BlockCategory from './BlockCategory.js';

const Block = db.define(
	'Block',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		peopleLimit: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		tableName: 'Blocks'
	}
);

Space.hasMany(Block, {
	foreignKey: 'spaceId',
	onDelete: 'cascade'
});

BlockCategory.hasMany(Block, {
	foreignKey: 'blockCategoryId',
	onDelete: 'set Null'
});

export default Block;
