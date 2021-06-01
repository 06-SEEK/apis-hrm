const { AuthenticationError } = require('apollo-server-express');
const History = require('../models/history.model');

module.exports = {
  Query: {
    histories: async (_, args, context, __) => {
      const { isAuth, user } = context;
      if (!isAuth) throw new AuthenticationError('Not authorzied to access');
      const histories = await History.find({ user: user._id }).populate('user');
      console.log(histories);
      return histories;
    },
  },
  Mutation: {
    history: async (_, args, context, ___) => {
      const { isAuth, user } = context;
      const { result } = args;
      if (!isAuth) throw new AuthenticationError('Not authorzied to access');
      const history = new History({ user: user._id, result });
      await history.save();
      return history;
    },
  },
};
