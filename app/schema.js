'use strict';
const _ = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const CustomersResolver = use('App/Resolvers/CustomersResolver');
const DepartmentCategories = use('App/Resolvers/DepartmentCategories');
const ProductsResolver = use('App/Resolvers/ProductsResolver');
const UsersResolver = use('App/Resolvers/UsersResolver');
const ShoppingCartsResolver = use('./Resolvers/ShoppingCartsResolver');
const OrdersResolver = use('App/Resolvers/OrdersResolver');

const resolvers = _.merge(
  CustomersResolver,
  DepartmentCategories,
  ProductsResolver,
  UsersResolver,
  ShoppingCartsResolver,
  OrdersResolver
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

  type OrderItem {
    id: ID!
    attributes: String!
    nameProduct: String!
    quantity: Int!
    costUnit: Float!
    product: Product!
  }

  type Order {
    id: ID!
    amountTotal: Float!
    status: Int!
    comments: String
    items: [OrderItem]!
  }

  type Query {
    allProducts: [Product]
    allUsers: [User]
    cart: [CartItem]
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
    submitOrder(source: String!): Order
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
