const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../util');
const config = require('../config');
const User = require('../models/user.model');

// auth middlewares to validate user's access token
module.exports = async (req, res, next) => {
  try {
    const token =
      req.header('Authorization') &&
      req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized to access');
    }
    const data = jwt.verify(token, config.secret_key);
    const user = await User.findById(data.sub);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized to access');
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
