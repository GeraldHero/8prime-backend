import request from 'supertest';
import app from '../app.js';
// import Subscribers from '../model/Subscribers.js';

import { dummySubcriber1, dummyTest1, setupDb } from './fixtures/db.js';

beforeEach(async () => {
  await setupDb();
});

describe('Subscribers API testing', () => {
  test('Should failed - to get all subscriber data without login', async () => {
    await request(app)
      .get('/api/subscribers')
      .expect(401, { msg: 'Not authorized!' });
  });

  test('Should get all subscribers data with token', async () => {
    const response = await request(app)
      .get('/api/subscribers')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200);
    expect(response.body).not.toBeNull();
  });

  test('Should get specific subscriber with token', async () => {
    const response = await request(app)
      .get(`/api/subscribers/${dummySubcriber1._id}`)
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200);

    expect(response.body.email).toBe(dummySubcriber1.email);
  });

  test('Should failed - no route', async () => {
    await request(app).get('/noRoute').expect(404, { msg: 'Page not Found' });
  });

  test('Should Create an Subscriber', async () => {
    const response = await request(app)
      .post('/api/subscribers')
      .send({
        name: 'gerald2',
        phone: '069558445',
        message: 'Lorem Ipsum 2',
        email: 'gerald@test.com',
      })
      .expect(201, { msg: 'Your message has been sent.' });
  });
});
