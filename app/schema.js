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
    id: ID!
    username: String!
    email: String!
  }

  type Department {
    id: ID!
    name: String!
    categories: [Category]
  }

  type Category {
    id: ID!
    name: String!
    department: Department
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    reducedPrice: Float!
    image: String
    thumbnail: String
    secondImage: String
  }

  type Query {
    allProducts: [Product]
    allUsers: [User]
    categories(departmentId: ID): [Category]
    departments: [Department]
    fetchUser(id: Int!): User
    products(departmentId: ID, categoryId: ID, keyword: String): [Product]
  }

  type Mutation {
    login (email: String!, password: String!): String
    createUser (username: String!, email: String!, password: String!): User
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
