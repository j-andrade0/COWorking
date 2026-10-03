import request from 'supertest';
import app from '../src/app.js';

let counter = 0;
const unique = () => `${Date.now()}${counter++}`;

export const api = () => request(app);

export async function registerUser(overrides = {}) {
	const id = unique();
	const body = {
		firstName: 'Test',
		lastName: 'User',
		cpf: `cpf${id}`,
		email: `user${id}@example.com`,
		password: 'pw-12345',
		phoneNumber: `ph${id}`,
		...overrides
	};
	const res = await api().post('/users').send(body);
	return { body, res };
}

export async function loginUser(overrides) {
	const { body } = await registerUser(overrides);
	const res = await api().post('/userLogin').send({ email: body.email, password: body.password });
	return { token: res.body.jwtToken, email: body.email, password: body.password };
}

export async function registerOwner(overrides = {}) {
	const id = unique();
	const body = {
		nomeEmpresarial: 'Biz',
		nomeFantasia: 'Biz',
		cnpj: `cnpj${id}`,
		email: `owner${id}@example.com`,
		password: 'pw-12345',
		phoneNumber: `ph${id}`,
		...overrides
	};
	const res = await api().post('/owners').send(body);
	return { body, res };
}

export async function loginOwner(overrides) {
	const { body, res: created } = await registerOwner(overrides);
	const res = await api().post('/ownerLogin').send({ email: body.email, password: body.password });
	return {
		token: res.body.jwtToken,
		ownerId: created.body.createdEntity?.id,
		email: body.email,
		password: body.password
	};
}

// Creates owner -> space -> block and a user; returns what a reservation needs.
export async function createBlockAndUser() {
	const { token, ownerId } = await loginOwner();
	const space = await api().post('/spaces').set('Authorization', token).send({ address: 'Rua 1', size: 10, ownerId });
	const block = await api()
		.post('/block')
		.set('Authorization', token)
		.send({ name: 'Sala', peopleLimit: 4, spaceId: space.body.id });
	const user = await loginUser();
	const userRow = await api().get(`/users/validateUser?email=${user.email}`).set('Authorization', user.token);
	return { token: user.token, userId: userRow.body.id, blockId: block.body.blockCategory.id };
}
