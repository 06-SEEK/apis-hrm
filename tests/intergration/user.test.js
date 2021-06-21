/* eslint-disable node/no-unpublished-require */
const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../app');
const setupTestDB = require('../utils/setupTestDb');
const User = require('../../models/user.model');
const { userOne, insertUsers } = require('../fixtures/user.fixture');

setupTestDB();

describe('User routes', () => {
  describe('POST /api/users/register', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
      };
    });

    test('should return 201 and successfully register user if request data is ok', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        email: newUser.email,
      });

      const dbUser = await User.findOne({ email: res.body.email });
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({
        name: newUser.name,
        email: newUser.email,
      });
    });

    test('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';

      await request(app)
        .post('/api/users/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 409 error if email is already used', async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(app)
        .post('/api/users/register')
        .send(newUser)
        .expect(httpStatus.CONFLICT);
    });

    test('should return error with status 404 if the endpoint not found', async () => {
      await request(app).get('/test').expect(httpStatus.NOT_FOUND);
    });
  });

  describe('POST /api/users/login', () => {
    test('should return 200 and login user if email and password match', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app)
        .post('/api/users/login')
        .send(loginCredentials)
        .expect(httpStatus.OK);

      expect(res.body.user).toEqual({
        name: userOne.name,
        email: userOne.email,
      });

      expect(res.body.token).toBeTruthy();
    });
    test('should return 400 error if there are no users with that email', async () => {
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app)
        .post('/api/users/login')
        .send(loginCredentials)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({
        status: httpStatus.BAD_REQUEST,
        message: 'Invalid login credentials',
      });
    });

    test('should return 400 error if password is wrong', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: 'wrongPassword1',
      };

      const res = await request(app)
        .post('/api/users/login')
        .send(loginCredentials)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({
        status: httpStatus.BAD_REQUEST,
        message: 'Invalid login credentials',
      });
    });
  });
});
