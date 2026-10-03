import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authenticate from '../src/middlewares/authenticationMiddleware.js';
import Owner from '../src/models/Owner.js';
import { api, registerUser, loginUser, registerOwner, loginOwner } from './helpers.js';

describe('login', () => {
	it('logs a user in and returns a JWT with id and role', async () => {
		const { email, password } = await loginUser();
		const res = await api().post('/userLogin').send({ email, password });
		expect(res.status).toBe(200);
		const payload = jwt.verify(res.body.jwtToken, process.env.JWT_SECRET_KEY);
		expect(payload).toMatchObject({ role: 'user' });
	});

	it('rejects a wrong user password with 401', async () => {
		const { body } = await registerUser();
		const res = await api().post('/userLogin').send({ email: body.email, password: 'nope' });
		expect(res.status).toBe(401);
	});

	it('logs an owner in (the controller used to crash on a missing jwt import)', async () => {
		const { body } = await registerOwner();
		const res = await api().post('/ownerLogin').send({ email: body.email, password: body.password });
		expect(res.status).toBe(200);
		expect(jwt.verify(res.body.jwtToken, process.env.JWT_SECRET_KEY)).toMatchObject({ role: 'owner' });
	});

	it('stores the owner password hashed, never in plain text', async () => {
		const { body, res } = await registerOwner();
		const row = await Owner.findByPk(res.body.createdEntity.id);
		expect(row.password).not.toBe(body.password);
		expect(await bcrypt.compare(body.password, row.password)).toBe(true);
	});

	it('rejects a wrong owner password with 401', async () => {
		const { body } = await registerOwner();
		const res = await api().post('/ownerLogin').send({ email: body.email, password: 'nope' });
		expect(res.status).toBe(401);
	});
});

describe('authentication middleware', () => {
	it.each([
		['get', '/users'],
		['get', '/users/1'],
		['get', '/users/validateUser?email=a@b.c'],
		['delete', '/users/1'],
		['get', '/owners'],
		['delete', '/owners/1'],
		['get', '/spaces'],
		['get', '/block'],
		['get', '/blockCategory'],
		['get', '/blockReservation']
	])('%s %s without a token is 401', async (method, path) => {
		const res = await api()[method](path);
		expect(res.status).toBe(401);
	});

	it('rejects a malformed token with 401', async () => {
		const res = await api().get('/users').set('Authorization', 'not-a-jwt');
		expect(res.status).toBe(401);
	});

	it('rejects a token signed with another secret with 401', async () => {
		const forged = jwt.sign({ id: 1 }, 'another-secret');
		const res = await api().get('/users').set('Authorization', forged);
		expect(res.status).toBe(401);
	});

	it('rejects an expired token with 401', async () => {
		const expired = jwt.sign({ id: 1 }, process.env.JWT_SECRET_KEY, { expiresIn: -10 });
		const res = await api().get('/users').set('Authorization', expired);
		expect(res.status).toBe(401);
	});

	it('accepts the raw token and the Bearer form', async () => {
		const { token } = await loginUser();
		expect((await api().get('/users').set('Authorization', token)).status).toBe(200);
		expect((await api().get('/users').set('Authorization', `Bearer ${token}`)).status).toBe(200);
	});

	it('answers 401 instead of hanging when verification fails unexpectedly', () => {
		const secret = process.env.JWT_SECRET_KEY;
		delete process.env.JWT_SECRET_KEY; // jwt.verify then throws a plain Error, not a JsonWebTokenError
		try {
			const res = { status: (code) => ({ json: (b) => ({ code, b }), send: (b) => ({ code, b }) }) };
			const out = authenticate({ header: () => 'some.token.value' }, res, () => {
				throw new Error('next must not be called');
			});
			expect(out.code).toBe(401);
		} finally {
			process.env.JWT_SECRET_KEY = secret;
		}
	});

	it('keeps registration public', async () => {
		expect((await registerUser()).res.status).toBe(201);
		expect((await registerOwner()).res.status).toBe(201);
	});

	it('reaches /users/validateUser (it used to be shadowed by /users/:id) without leaking the password', async () => {
		const { token, email } = await loginUser();
		const res = await api().get('/users/validateUser').query({ email }).set('Authorization', token);
		expect(res.status).toBe(200);
		expect(res.body.email).toBe(email);
		expect(res.body.password).toBeUndefined();
	});

	it('never returns the owner password', async () => {
		const { token, ownerId } = await loginOwner();
		const one = await api().get(`/owners/${ownerId}`).set('Authorization', token);
		expect(one.status).toBe(200);
		expect(one.body.password).toBeUndefined();
		const patched = await api()
			.patch(`/owners/${ownerId}`)
			.set('Authorization', token)
			.send({ nomeFantasia: 'Novo' });
		expect(patched.status).toBe(200);
		expect(patched.body.nomeFantasia).toBe('Novo');
		expect(patched.body.password).toBeUndefined();
	});
});
