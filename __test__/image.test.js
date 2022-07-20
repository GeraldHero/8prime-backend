import request from 'supertest';
import app from '../app.js';
// import Subscribers from '../model/Subscribers.js';

import { imageDummy1, dummyTest1, setupDb } from './fixtures/db.js';

beforeEach(async () => {
  await setupDb();
});

const testImage = `${__dirname}/fixtures/a.jpg`;

describe('Images API testing', () => {
  test('Should failed, no authorization to get an image', async () => {
    await request(app)
      .get('/api/images')
      .expect(401, { msg: 'Not authorized!' });
  });
  test('Should get all images', async () => {
    const response = await request(app)
      .get('/api/images')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200);
    expect(response.body).not.toBeNull();
  });

  test('Should upload an images and delete all uploaded images', async () => {
    const response = await request(app)
      .post('/api/images')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .field('section', 'singleType')
      .attach('upload', testImage)
      .set('Content-Type', 'multipart/form-data')
      .expect(201);

    await request(app)
      .delete(`/api/images/deleteAll/${response.body.image._id}`)
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200);
  });

  test('Should upload an images and delete specific image', async () => {
    const response = await request(app)
      .post('/api/images')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .field('section', 'singleType')
      .attach('upload', testImage)
      .set('Content-Type', 'multipart/form-data')
      .expect(201);
    // .send({ name: ""}) - to implement on req.body
    // src https://www.npmjs.com/package/supertest
    await request(app)
      .delete(`/api/images/${response.body.image._id}`)
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .send({ filename: response.body.image.photos[0].filename })
      .expect(200);
  });
});
