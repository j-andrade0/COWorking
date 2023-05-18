import mongoose from 'mongoose';

// REVIEW CONNECTION
mongoose.connect(
	'mongodb+srv://andrade:pM2HvU37TESJ7JAp6Kfu6ac6mnXsjEVdG63JDAp@cluster0.zrdi0v6.mongodb.net/Alura-node'
);

let db = mongoose.connection;

export default db;