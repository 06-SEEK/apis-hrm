const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { login,register } = require('../validations/user.validation');
const {validate} = require('express-validation');
const auth = require('../middlewares/auth');

/**
 * @api {post} /api/users/register
 * @apiDescription Register a new user
 * @apiName Register
 * @apiGroup User
 * @apiPermission public
 *
 * @apiBodyParam  {String}  email     User's email
 * @apiBodyParam  {String}  password  User's password
 *
 * @apiSuccess (Created 201) {String}   phone    User's phone if exists
 * @apiSuccess (Created 201) {String}   name    User's name if exists
 * @apiSuccess (Created 201) {String}   email    User's email
 * @apiSuccess (Created 201) {String}   avatar    User's avatar if exists
 *
 * @apiError (Bad Request 400)  ValidationError     Some parameters may contain invalid values
 * @apiError (Conflict 409)     ConflictError       Email already existed       
 */
router.post('/register', validate(register), controller.register);



/**
 * @api {post} /api/users/login
 * @apiDescription Login user
 * @apiName Login
 * @apiGroup User
 * @apiPermission public
 *
 * @apiBodyParam  {String}  email     User's email
 * @apiBodyParam  {String}  password  User's password
 *
 * @apiSuccess  {String}    phone    User's phone if exists
 * @apiSuccess  {String}    name     User's name if exists
 * @apiSuccess  {String}    email    User's email
 * @apiSuccess  {String}    avatar   User's avatar if exists
 * @apiSuccess  {String}    token    access token
 *
 * @apiError (Bad Request 400)  ValidationError     Some parameters may contain invalid values
 * @apiError (Bad Request 400)  CredentialsError    Credentials is invalid
 */
router.post('/login', validate(login), controller.login);

//test route for authenticated user
router.get('/', auth, controller.listUser);

module.exports = router;
