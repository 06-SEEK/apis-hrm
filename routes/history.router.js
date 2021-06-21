const express = require('express');
const controller = require('../.controllers/history.controller');

const router = express.Router();
const auth = require('../middlewares/auth');
const { validate } = require('../util/validate');
const { postHistory } = require('../validations/history.validation');


/**
 * @api {get} /api/histories
 * @apiDescription Get histories of a user
 * @apiName Get histories
 * @apiGroup Histories
 * @apiPermission public
 * @apiRequired	  Authentication token (jwt)		
 *
 * @apiSuccess (OK 200) {Array}   histories    User's histories
 * @apiSuccess (OK 200) {ObjectID}   _id    History's mongo id
 * @apiSuccess (OK 200) {ObjectID}   user    User's mongo id
 * @apiSuccess (OK 200) {Number}     result  History's result
 * @apiSuccess (OK 200) {Date}   createdAt    History's created day
 * @apiSuccess (OK 200) {Date}   updatedAt    History's updated day 
 *
 * @apiError (Unauthorized 401)  Unauthorized     Not authrozied to access
 */
router.get('/', auth, controller.listHistory);

/**
 * @api {post} /api/histories
 * @apiDescription Post result of a user
 * @apiName Create history
 * @apiGroup Histories
 * @apiPermission public
 * @apiRequired	  Authentication token (jwt)		
 *
 * @apiBodyParam {Number}	result	History 's result
 *
 * @apiSuccess (OK 200) {ObjectID}   _id    History's mongo id
 * @apiSuccess (OK 200) {ObjectID}   user    User's mongo id
 * @apiSuccess (OK 200) {Number}     result  History's result
 * @apiSuccess (OK 200) {Date}   createdAt    History's created day
 * @apiSuccess (OK 200) {Date}   updatedAt    History's updated day 
 *
 * @apiError (Unauthorized 401)  Unauthorized     Not authrozied to access
 * @apiError (Bad Request 400)   ValidationError  Result is required
 */
router.post('/', validate(postHistory), auth, controller.postHistory);

module.exports = router;
