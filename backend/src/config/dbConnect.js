import { Sequelize } from 'sequelize';
import env from './env.json' assert { type: 'json' };

const db = new Sequelize(env.db_name, env.db_user, env.db_password, {
	host: 'localhost',
	dialect: 'mysql',
});

try {
	await db.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

export default db;
// should close the connection?