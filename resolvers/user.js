const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/user.model');

module.exports = {
  Query: {
    users: async (_, __, context, ___) => {
      const { isAuth } = context;
      if (!isAuth) throw new AuthenticationError('Not authorized to access');
      const users = await User.find({}, 'phone name email avatar');
      return users;
    },
  },
};
