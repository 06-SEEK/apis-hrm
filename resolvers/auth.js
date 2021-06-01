const httpStatus = require('http-status');
const User = require('../models/user.model');
const { ApiError } = require('../util');

module.exports = {
  Mutation: {
    register: async (_, args, __, ___) => {
      const { input } = args;
      const foundUser = await User.findOne({ email: input.email });
      if (foundUser) {
        throw new ApiError(httpStatus.CONFLICT, 'Email already exists');
      }
      const user = new User(input);
      await user.save();
      return user.transform();
    },
    login: async (_, args, __, ___) => {
      const { email, password } = args.input;
      const user = await User.findByCredentials(email, password);
      const token = await user.token();
      return {
        token,
        user: user.transform(),
      };
    },
  },
};
