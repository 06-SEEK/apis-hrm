const express = require('express');
const {
  listHistory,
  postHistory,
} = require('../.controllers/history.controller');

const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, listHistory);
router.post('/', auth, postHistory);

module.exports = router;
