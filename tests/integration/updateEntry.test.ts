import supertest from 'supertest';
import db from '../../src/database';
import app from '../../src/app';
import userFactory from '../../prisma/factories/userFactory';
import pageFactory from '../../prisma/factories/pageFactory';
import entryDataFactory from '../../prisma/factories/entryDataFactory';
import createUser from '../utils/createUser';
import generateToken from '../utils/generateToken';

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
  await db.$queryRaw`TRUNCATE TABLE pages RESTART IDENTITY CASCADE`;
  await db.$queryRaw`TRUNCATE TABLE entries RESTART IDENTITY CASCADE`;
});

afterAll(() => {
  db.$disconnect();
});

describe('PUT /entries integration tests...', () => {
  it('Sending correct information, should return 200 and change the entry', async () => {
    await createUser(userFactory());
    const token = generateToken(1);
    const page = pageFactory();
    await db.page.create({ data: { ...page, userId: 1 } });
    const entryData = entryDataFactory();
    await db.entry.create({ data: { ...entryData, pageId: 1, index: 0 } });
    const newData = entryDataFactory();
    const response = await supertest(app)
      .put(`/entries/1/1`)
      .set({ Authorization: `Bearer ${token}` })
      .send(newData);
    const query = await db.entry.findUnique({ where: { id: 1 } });
    expect(response.status).toBe(200);
    expect(query?.type).toBe(newData.type);
    expect(query?.title).toBe(newData.title);
    expect(query?.description).toBe(newData.description);
    expect(query?.text).toBe(newData.text);
    expect(query?.imageUrl).toBe(newData.imageUrl);
    expect(query?.sourceUrl).toBe(newData.sourceUrl);
    expect(query?.space).toBe(newData.space);
  });
});