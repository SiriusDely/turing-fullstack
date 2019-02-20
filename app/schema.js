'use strict';
const _ = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const UsersResolver = require('./Resolvers/UsersResolver');
const ProductsResolver = require('./Resolvers/ProductsResolver');

const resolvers = _.merge(
  UsersResolver,
  ProductsResolver
);

// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Product {
    id: Int!
    name: String!
    description: String
    price: String!
    reducedPrice: String!
    image: String
    thumbnail: String
    secondImage: String
  }

  type Query {
    allUsers: [User]
    fetchUser(id: Int!): User
    allProducts: [Product]
  }

  type Mutation {
    login (email: String!, password: String!): String
    createUser (username: String!, email: String!, password: String!): User
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
