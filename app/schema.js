'use strict';
const _ = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const DepartmentCategories = require('./Resolvers/DepartmentCategories');
const ProductsResolver = require('./Resolvers/ProductsResolver');
const UsersResolver = require('./Resolvers/UsersResolver');

const resolvers = _.merge(
  DepartmentCategories,
  ProductsResolver,
  UsersResolver
);

// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Department {
    id: Int!
    name: String!
  }

  type Category {
    id: Int!
    name: String!
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
    allProducts: [Product]
    allUsers: [User]
    categories(departmentId: Int): [Category]
    departments: [Department]
    fetchUser(id: Int!): User
    products(departmentId: Int, categoryId: Int): [Product]
  }

  type Mutation {
    login (email: String!, password: String!): String
    createUser (username: String!, email: String!, password: String!): User
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
