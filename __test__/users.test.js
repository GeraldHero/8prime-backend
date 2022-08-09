import request from 'supertest';
import app from '../testServer.js';
import Users from '../model/Users.js';

import { dummyTest1, setupDb } from './fixtures/db.js';

beforeEach(async () => {
  await setupDb();
});

describe('Users API testing', () => {
  test('Should failed - to get all users data without login', async () => {
    await request(app)
      .get('/api/users')
      .expect(401, { msg: 'Not authorized!' });
  });

  test('Should get all users data with token', async () => {
    const response = await request(app)
      .get('/api/users')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200);
    expect(response.body).not.toBeNull();
  });

  test('Should get specific users with token', async () => {
    const response = await request(app)
      .get(`/api/users/${dummyTest1._id}`)
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200);

    expect(response.body.username).toBe(dummyTest1.username);
  });

  test('Should failed - no route', async () => {
    await request(app).get('/noRoute').expect(404, { msg: 'Page not Found' });
  });

  test('Should Register an account', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'gerald2',
        password: '123456gh',
      })
      .expect(201);

    const result = await Users.findById(response.body.user._id);
    expect(result).not.toBeNull();
    expect(result.password).not.toBe('123456gh');
  });

  test('Should detect account already registered', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'gerald',
        password: '123456gh',
      })
      .expect(401, { msg: 'Account is already registered!' });
  });
});
