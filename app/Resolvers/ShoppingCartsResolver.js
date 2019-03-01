'use strict';

const ShoppingCart = use('App/Models/ShoppingCart');

const ShoppingCartsResolver = {
  Mutation: {
    async addToCart(_, { productId, attributes }, { auth }) {
      const authenticator = auth.authenticator('customer');
      await authenticator.check();
      const customer = await authenticator.getUser();
      await customer.load('shoppingCarts');
      console.log('customer:', customer);
      let shoppingCarts = customer.shoppingCarts();
      let shoppingCart;
      try {
        shoppingCart = await ShoppingCart.query().where('customer_id', customer.id).andWhere('product_id', productId).andWhere('attributes', attributes).first();
      } catch(e) {
        // console.error('e:', e);
        shoppingCart = new ShoppingCart();
        shoppingCart.fill({ product_id: productId, attributes });
        await customer.shoppingCarts().save(shoppingCart);
      }
      console.log('shoppingCart:', shoppingCart);
    }
  }
};

module.exports = ShoppingCartsResolver;
