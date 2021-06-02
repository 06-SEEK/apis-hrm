const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    users: [User]
  }

  type User {
    name: String
    phone: String
    avatar: String
    email: String!
  }
`;

module.exports = typeDefs;
