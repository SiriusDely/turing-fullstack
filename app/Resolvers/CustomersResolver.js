'use strict';

// const slugify = require('slugify');

const Customer = use('App/Models/Customer');

// Define resolvers
const CustomersResolver = {
  Mutation: {
    async register(_, { name, email, password }, { auth }) {
      await Customer.create({ name, email, password });
      const { token } = await auth.authenticator('customer').attempt(email, password);
      return token;
    },

    async login(_, { email, password }, { auth }) {
      const { token } = await auth.authenticator('customer').attempt(email, password);
      return token;
    },
  }
}

module.exports = CustomersResolver;
