const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  extend type Query {
    histories: [History]
  }

  extend type Mutation {
    history(result: Int): History!
  }

  type History {
    user: User!
    result: Int!
    createdAt: Date!
    updatedAt: Date!
  }
`;

module.exports = typeDefs;
