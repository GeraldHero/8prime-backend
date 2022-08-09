import request from 'supertest';
import app from '../testServer.js';
import { dummyTest1, setupDb } from './fixtures/db.js';

beforeEach(async () => {
  await setupDb();
});

describe('Users Login Testing', () => {
  test('Should Login', async () => {
    await request(app)
      .post('/api/auth')
      .send({
        username: 'gerald',
        password: '123456gh',
      })
      .expect(200);
  });

  test('Should failed login incomplete', async () => {
    await request(app)
      .post('/api/auth')
      .send({
        username: 'gerald',
        password: '',
      })
      .expect(400, { msg: 'Invalid Credential' });
  });

  test('Should failed login no user found', async () => {
    await request(app)
      .post('/api/auth')
      .send({
        username: 'geraldnotFound',
        password: '123456123',
      })
      .expect(400, { msg: 'Invalid Credential' });
  });

  test('Should logout or delete current token', async () => {
    await request(app)
      .post('/api/auth/logout')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .send()
      .expect(200, { msg: 'Logout succesfully!' });
  });

  test('Should logout all active token or delete all tokens', async () => {
    await request(app)
      .post('/api/auth/logoutAll')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .send()
      .expect(200, { msg: 'All device are succesfully logout!' });
  });
});

describe('Uthorization test', () => {
  test('Should failed - no token/not login', async () => {
    await request(app)
      .get('/api/users')
      .expect(401, { msg: 'Not authorized!' });
  });

  it('Should failed - token is unauthorized', async () => {
    await request(app)
      .get('/api/user')
      .set({
        Authorization: `Bearer 21231231`,
      })
      .expect(404, { msg: 'Page not Found' });
  });
});
