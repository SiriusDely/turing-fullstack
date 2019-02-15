'use strict';
const _ = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const UsersResolver = require('./Resolvers/UsersResolver');
const resolvers = _.merge(
  UsersResolver,
);

// Define our schema using the GraphQL schema language
const typeDefs = `
type User {
  id: Int!
    username: String!
    email: String!
}

type Query {
  allUsers: [User]
  fetchUser(id: Int!): User
}

type Mutation {
  login (email: String!, password: String!): String
  createUser (username: String!, email: String!, password: String!): User
}
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
