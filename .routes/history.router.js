const express = require('express');
const controller = require('../.controllers/history.controller');

const router = express.Router();
const auth = require('../middlewares/auth');
const { validate } = require('../util/validate');
const { postHistory } = require('../validations/history.validation');

router.get('/', auth, controller.listHistory);
router.post('/', validate(postHistory), auth, controller.postHistory);

module.exports = router;
