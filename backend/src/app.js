import express from 'express';
import db from './config/dbConnect.js';
import User from './models/User.js';
import routes from './routes/index.js';

try {
	await db.sync({ force: true }); // dev config, maybe should be db.sync() on prod
	console.warn('All models were synchronized successfully.');
} catch (error) {
	console.error(error);
}

const app = express();
app.use(express.json());
routes(app);

export default app;
