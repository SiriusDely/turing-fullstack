'use strict';

const Database = use('Database');
const Category = use('App/Models/Category');
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
      const authenticator = auth.authenticator('jwt');
      await authenticator.check();
      const user = await authenticator.getUser();
      */
      const products = await Product.query().orderBy('product_id', 'desc').fetch();
      return products.toJSON();
    },

    async products(_, args) {
      let { departmentId, categoryId, keyword } = args;

      let products;
      if (categoryId) {
        const category = await Category.find(categoryId);
        products = category.products();
      } else if (departmentId) {
        const categoriesIds = await Category.query()
              .where('department_id', departmentId).pluck('category_id');

        if (categoriesIds.length == 0) { return []; }

        let whereRaw = `"product_category"."category_id" IN (${categoriesIds.join(',')})`;
        if (keyword && keyword.length.trim().length) { whereRaw += ` AND LOWER(name) LIKE LOWER('%${keyword}%')`; }

        products = await Database.table('product').select([
          'product.product_id as id',
          'product.name',
          'product.description',
          'product.price',
          'product.discounted_price as reducedPrice',
          'product.image',
          'product.image_2 as secondImage',
          'product.thumbnail'
        ]).innerJoin('product_category', function() {
          this.on('product.product_id', 'product_category.product_id');
        }).whereRaw(whereRaw);

        return products;
      } else {
        products = Product.query();
      }

      if (keyword && keyword.trim().length) {
        products = products.whereRaw(`LOWER(name) LIKE LOWER('%${keyword}%')`);
      }

      products = await products.orderBy('product_id', 'desc').fetch();
      return products.toJSON();
    }
  }
};

module.exports = ProductsResolver;
