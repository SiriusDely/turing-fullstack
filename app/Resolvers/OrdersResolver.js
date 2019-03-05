'use strict';

const Database = use('Database');
const Env = use('Env');
const Logger = use('Logger');
const Mail = use('Mail');
const Order = use('App/Models/Order');
const ShoppingCart = use('App/Models/ShoppingCart');
const Stripe = use('Turing/Stripe');

const OrdersResolver = {
  Mutation: {
    async submitOrder(_, { source }, { auth }) {
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
      */
      let totalAmount = 0;
      const orderDetails = [];
      const shoppingCartsJson = shoppingCarts.toJSON();
      for (let shoppingCartJson of shoppingCartsJson) {
        const product = shoppingCartJson.product;
        const price = product.reducedPrice > 0 ? product.reducedPrice : product.price;

        const orderDetail = {
          product_id: product.id,
          product_name: product.name,
          quantity: shoppingCartJson.quantity,
          unit_cost: price,
          attributes: shoppingCartJson.attributes,
        };
        orderDetails.push(orderDetail);

        const amount = shoppingCartJson.quantity * price;
        totalAmount += amount;
      }

      const transaction = await Database.beginTransaction()
      const order = await Order.create({
        customer_id: customer.customer_id,
        total_amount: totalAmount,
        created_on: new Date().toISOString(),
        shipping_id: customer.shipping_region_id,
        tax_id: 1
      })
      await order.items().createMany(orderDetails);

      await ShoppingCart.query()
        .with('product')
        .where('customer_id', customer.customer_id)
        .delete();

      transaction.commit();

      await order.reload();
      await order.load('items.product');
      const orderJson = order.toJSON();

      try {
        const charge = await Stripe.charges.create({
          amount: totalAmount * 100,
          currency: 'usd',
          description: customer.name,
          source,
          receipt_email: customer.email
        });

        await Mail.send('email.order-confirmation', {
          username: customer.name,
          order: orderJson
        }, (message) => {
          message.subject('Order Confirmation')
          message.from('no-reply@turing-fullstack.com')
          message.to(Env.get('MAIL_ADDRESS', customer.email))
        })
      } catch(e) {
        Logger.error('stripe error:', e);
      }

      return orderJson;
    }
  }
};

module.exports = OrdersResolver;
