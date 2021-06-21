/* eslint-disable node/no-unpublished-require */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');
const setupTestDB = require('../utils/setupTestDb');
const { userOne, insertUsers } = require('../fixtures/user.fixture');

setupTestDB();

describe('History routes', () => {
  describe('POST /api/histories', () => {
    test('should return 401 if user is not authenticated', async () => {
      const body = { result: 88 };
      await request(app)
        .post('/api/histories')
        .send(body)
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 400 if request data is missing body', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app)
        .post('/api/users/login')
        .send(loginCredentials)
        .expect(httpStatus.OK);

      await request(app)
        .post('/api/histories')
        .set('Authorization', `Bearer ${res.body.token}`)
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return 200 and history if user is authenticated', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app)
        .post('/api/users/login')
        .send(loginCredentials)
        .expect(httpStatus.OK);

      const body = { result: 88 };
      const historyRes = await request(app)
        .post('/api/histories')
        .set('Authorization', `Bearer ${res.body.token}`)
        .send(body)
        .expect(httpStatus.OK);
      expect(historyRes.body.history).toEqual({
        _id: expect.anything(),
        user: expect.anything(),
        result: 88,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });
  });
  describe('GET /api/histories', () => {
    test('should return 401 if user is not authenticated', async () => {
      await request(app).get('/api/histories').expect(httpStatus.UNAUTHORIZED);
    });
    test('should return 200 and histories if user is authenticated', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app)
        .post('/api/users/login')
        .send(loginCredentials)
        .expect(httpStatus.OK);

      const body = { result: 88 };
      await request(app)
        .post('/api/histories')
        .set('Authorization', `Bearer ${res.body.token}`)
        .send(body)
        .expect(httpStatus.OK);
      const getResult = await request(app)
        .get('/api/histories')
        .set('Authorization', `Bearer ${res.body.token}`)
        .expect(httpStatus.OK);
      expect(getResult.body.histories).toEqual(
        expect.arrayContaining([
          {
            _id: expect.anything(),
            user: expect.anything(),
            result: 88,
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
          },
        ])
      );
    });
  });
});
