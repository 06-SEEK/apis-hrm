const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Mutation {
    register(input: AuthenticationInput): User
    login(input: AuthenticationInput): LoginResult
  }

  input AuthenticationInput {
    email: String!
    password: String!
  }

  type LoginResult {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
