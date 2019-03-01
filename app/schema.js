'use strict';
const _ = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const CustomersResolver = require('./Resolvers/CustomersResolver');
const DepartmentCategories = require('./Resolvers/DepartmentCategories');
const ProductsResolver = require('./Resolvers/ProductsResolver');
const UsersResolver = require('./Resolvers/UsersResolver');

const resolvers = _.merge(
  CustomersResolver,
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

  type Customer {
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

  type Attribute {
    id: ID!
    name: String!
    values: [AttributeValue]!
  }

  type AttributeValue {
    id: ID!
    value: String!
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

  type ProductDetail {
    item: Product!
    attributes: [Attribute]
  }

  type Products {
    total: Int,
    perPage: Int,
    lastPage: Int,
    page: Int,
    data: [Product]
  }

  type CartItem {
    id: ID!,
    altId: String!,
    attributes: String!,
    quantity: Int!,
    orderNow: Boolean!,
    product: Product,
  }

  type Cart {
    items: [CartItem]!
  }

  type Query {
    allProducts: [Product]
    allUsers: [User]
    categories(departmentId: ID): [Category]
    departments: [Department]
    fetchUser(id: ID): User
    product(id: ID): ProductDetail
    products(departmentId: ID, categoryId: ID, keyword: String, page: Int): Products
  }

  type Mutation {
    addToCart(productId: ID!, attributes: String!): Cart
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
    register(name: String!, email: String!, password: String!): String
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
