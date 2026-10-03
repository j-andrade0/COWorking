import { describe, it, expect, beforeAll } from 'vitest';
import { api, createBlockAndUser } from './helpers.js';

let ctx;
const book = (startDate, endDate, extra = {}) =>
	api()
		.post('/blockReservation')
		.set('Authorization', ctx.token)
		.send({ userId: ctx.userId, blockId: ctx.blockId, startDate, endDate, ...extra });

beforeAll(async () => {
	ctx = await createBlockAndUser();
	// Existing reservation: 10:00Z - 12:00Z
	const res = await book('2030-01-10T10:00:00.000Z', '2030-01-10T12:00:00.000Z');
	expect(res.status).toBe(201);
	ctx.reservationId = res.body.blockReservation.id;
});

describe('POST /blockReservation validation', () => {
	it('rejects a start date after the end date', async () => {
		const res = await book('2030-02-01T12:00:00.000Z', '2030-02-01T10:00:00.000Z');
		expect(res.status).toBe(400);
	});

	it('rejects equal start and end', async () => {
		const res = await book('2030-02-01T10:00:00.000Z', '2030-02-01T10:00:00.000Z');
		expect(res.status).toBe(400);
	});

	it('rejects an invalid date', async () => {
		const res = await book('not-a-date', '2030-02-01T10:00:00.000Z');
		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/valid date/);
	});

	it('rejects a user or block that does not exist', async () => {
		expect((await book('2030-03-01T10:00:00.000Z', '2030-03-01T11:00:00.000Z', { userId: 99999 })).status).toBe(
			400
		);
		expect((await book('2030-03-01T10:00:00.000Z', '2030-03-01T11:00:00.000Z', { blockId: 99999 })).status).toBe(
			400
		);
	});

	it('rejects a reservation that starts inside an existing one', async () => {
		const res = await book('2030-01-10T11:00:00.000Z', '2030-01-10T13:00:00.000Z');
		expect(res.status).toBe(400);
		expect(res.body.message).toBe('Time already booked');
	});

	it('rejects a reservation that ends inside an existing one', async () => {
		const res = await book('2030-01-10T09:00:00.000Z', '2030-01-10T11:00:00.000Z');
		expect(res.status).toBe(400);
		expect(res.body.message).toBe('Time already booked');
	});

	it('rejects a reservation that wraps an existing one', async () => {
		const res = await book('2030-01-10T09:00:00.000Z', '2030-01-10T13:00:00.000Z');
		expect(res.status).toBe(400);
		expect(res.body.message).toBe('Time already booked');
	});

	it('rejects an overlap sent with a different UTC offset', async () => {
		// 08:00-09:30 at -03:00 is 11:00Z-12:30Z
		const res = await book('2030-01-10T08:00:00-03:00', '2030-01-10T09:30:00-03:00');
		expect(res.status).toBe(400);
		expect(res.body.message).toBe('Time already booked');
	});

	it('allows adjacent reservations (ends exactly when another starts)', async () => {
		expect((await book('2030-01-10T09:00:00.000Z', '2030-01-10T10:00:00.000Z')).status).toBe(201);
		expect((await book('2030-01-10T12:00:00.000Z', '2030-01-10T13:00:00.000Z')).status).toBe(201);
	});
});

describe('PATCH /blockReservation/:id', () => {
	it('does not collide with itself when extending its own interval', async () => {
		const res = await api()
			.patch(`/blockReservation/${ctx.reservationId}`)
			.set('Authorization', ctx.token)
			.send({ endDate: '2030-01-10T11:30:00.000Z' });
		expect(res.status).toBe(200);
	});

	it('still rejects overlapping another reservation', async () => {
		const res = await api()
			.patch(`/blockReservation/${ctx.reservationId}`)
			.set('Authorization', ctx.token)
			.send({ endDate: '2030-01-10T12:30:00.000Z' }); // overlaps the 12:00-13:00 one
		expect(res.status).toBe(400);
	});

	it('rejects an inverted interval', async () => {
		const res = await api()
			.patch(`/blockReservation/${ctx.reservationId}`)
			.set('Authorization', ctx.token)
			.send({ startDate: '2030-01-10T13:00:00.000Z', endDate: '2030-01-10T12:00:00.000Z' });
		expect(res.status).toBe(400);
	});
});
