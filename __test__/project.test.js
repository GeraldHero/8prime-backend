import request from 'supertest';
import app from '../testServer.js';
import Projects from '../model/Projects.js';
import { dummyProject1, dummyTest1, setupDb } from './fixtures/db.js';

beforeEach(async () => {
  await setupDb();
});

const testImage = `${__dirname}/fixtures/a.jpg`;

describe('Project API testing', () => {
  test('Should get all projects data ', async () => {
    const response = await request(app).get('/api/projects').expect(200);
    expect(response.body).not.toBeNull();
  });

  test('Should create a project without images', async () => {
    const response = await request(app)
      .post('/api/projects')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .send({
        title: 'gerald2',
        description: '069558445',
        listTitle: 'Lorem Ipsum 2',
        bedrooms: 2,
        cr: 3,
        sq: 2,
        area: 'Living Area, Kitchen, Loundry Area',
        price: 200000,
      })
      .expect(201);
  });

  test('Should create a projects with image', async () => {
    const response = await request(app)
      .post('/api/projects')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .attach('upload', testImage)
      .field({
        title: 'gerald2',
        description: '069558445',
        listTitle: 'Lorem Ipsum 2',
        bedrooms: 2,
        cr: 3,
        sq: 2,
        area: 'Living Area, Kitchen, Loundry Area',
        price: 200000,
      })
      .expect(201);
  });

  test('Should update a project', async () => {
    await request(app)
      .patch(`/api/projects/${dummyProject1._id}`)
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .attach('upload', testImage)
      .field({
        title: 'test',
        description: 'testing edit project description',
        listTitle: 'testing listTitle',
        bedrooms: 0,
        cr: 0,
        sq: 0,
        area: 'test, testing, testingiest',
        price: 0,
      })
      .expect(200);

    const result = await Projects.findById(dummyProject1._id);

    expect(result.title).toBe('test');
    expect(result.description).toBe('testing edit project description');
    expect(result.listTitle).toBe('testing listTitle');
    expect(result.area).toStrictEqual(['test', 'testing', 'testingiest']);
    expect(result.bedrooms).toBe(0);
    expect(result.price).toBe(0);
    expect(result.cr).toBe(0);
    expect(result.sq).toBe(0);
  });

  test('Should delete a Project', async () => {
    await request(app)
      .delete(`/api/projects/${dummyProject1._id}`)
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200, { msg: 'Deleted Successfully!' });
  });
});
