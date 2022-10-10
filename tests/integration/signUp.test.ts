import supertest from 'supertest';
import db from '../../src/database';
import app from '../../src/app';
import userFactory from '../../prisma/factories/userFactory';
import createUser from '../utils/createUser';

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

afterAll(() => {
  db.$disconnect();
});

describe('POST /sign-up integration test...', () => {
  it('Sending correct information, must return 201', async () => {
    const data = userFactory();
    const response = await supertest(app).post('/sign-up').send(data);
    const query = await db.user.findUnique({ where: { id: 1 } });
    expect(response.status).toBe(201);
    expect(query?.id).toBe(1);
  });

  it('Sending the same user again, must return 409', async () => {
    const user = userFactory();
    await createUser(user);
    const response = await supertest(app).post('/sign-up').send(user);
    expect(response.status).toBe(409);
  });
});