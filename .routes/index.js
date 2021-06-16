const express = require('express');
const userRoute = require('./user.router');
const historyRoute = require('./history.router');

const router = express.Router();

router.use('/users', userRoute);
router.use('/histories', historyRoute);

module.exports = router;
