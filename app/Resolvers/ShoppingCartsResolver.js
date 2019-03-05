'use strict';

const Logger = use('Logger');
const ShoppingCart = use('App/Models/ShoppingCart');

const ShoppingCartsResolver = {
  Query: {
    async cart(_, __, { auth }) {
      const authenticator = auth.authenticator('customer');
      await authenticator.check();
      const customer = await authenticator.getUser();

      const shoppingCarts = await ShoppingCart.query()
            .with('product')
            .where('customer_id', customer.customer_id)
            .fetch();
      /*
      for (let shoppingCart of shoppingCarts.rows) {
        await shoppingCart.load('product');
      }
      Logger.info('ShoppingCartsResolver.Query.cart.shoppingCarts:', shoppingCarts);
      */
      return shoppingCarts.toJSON();
    }
  },

  Mutation: {
    async addToCart(_, { productId, attributes }, { auth }) {
      const authenticator = auth.authenticator('customer');
      await authenticator.check();
      const customer = await authenticator.getUser();

      let shoppingCart;
      try {
        shoppingCart = await ShoppingCart.query().where('customer_id', customer.customer_id).andWhere('product_id', productId).andWhere('attributes', attributes).first();
        shoppingCart.quantity++;
        await shoppingCart.save();
      } catch(e) {
        // console.error('e:', e);
        shoppingCart = new ShoppingCart();
        shoppingCart.fill({
          product_id: productId,
          attributes,
          quantity: 1,
          added_on: new Date().toISOString()
        });
        await customer.shoppingCarts().save(shoppingCart);
      }

      // await customer.load('shoppingCarts.product');
      const shoppingCarts = await ShoppingCart.query()
            .with('product')
            .where('customer_id', customer.customer_id)
            .fetch();
      /*
      for (let shoppingCart of shoppingCarts.rows) {
        await shoppingCart.load('product');
      }
      */
      return { items: shoppingCarts.toJSON() };
    }
  }
};

module.exports = ShoppingCartsResolver;
