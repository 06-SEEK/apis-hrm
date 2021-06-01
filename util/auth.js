const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user.model');

module.exports = async (req) => {
  try {
    const token =
      req.header('Authorization') &&
      req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return { isAuth: false };
    }
    const data = jwt.verify(token, config.secret_key);
    const user = await User.findById(data.sub);
    if (!user) {
      return { isAuth: false };
    }
    return { isAuth: true, user };
  } catch (e) {
    return { isAuth: false };
  }
};
