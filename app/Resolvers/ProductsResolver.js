'use strict';

const Product = use('App/Models/Product');

const ProductsResolver = {
  Query: {
    async allProducts() {
      const products = await Product.all();
      return products.toJSON();
    }
  }
};

module.exports = ProductsResolver;
