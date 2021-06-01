const { gql } = require('apollo-server-express');
const authType = require('./auth');
const userType = require('./user');
const historyType = require('./history');

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

module.exports = [typeDefs, authType, userType, historyType];
