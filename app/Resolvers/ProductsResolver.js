'use strict';

const Product = use('App/Models/Product');

const ProductsResolver = {
  Query: {
    // async allProducts(parent, args, context, info) {
    async allProducts(_, __, { auth }) {
      /*
      const auth = context.auth;
      const ctx = context.auth._ctx;
      const request = ctx.request;
      const headers = request.headers();
      const authorization = request.header('authorization');
      const session = ctx.session;
      */
      const authenticator = auth.authenticator('jwt');
      await authenticator.check();
      const user = await authenticator.getUser();
      const products = await Product.all();
      return products.toJSON();
    }
  }
};

module.exports = ProductsResolver;
