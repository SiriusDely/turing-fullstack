'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ShoppingCart extends Model {
  static get table() {
    return 'shopping_cart';
  }

  static get primaryKey () {
    return 'item_id';
  }

  static get createdAtColumn () {
    return null;
  }

  static get updatedAtColumn () {
    return null;
  }

  static get computed() {
    return [ 'id', 'altId', 'orderNow', 'addedAt' ];
  }

  static boot() {
    super.boot();
    this.addHook('beforeSave', async (instance) => {
      instance.cart_id = `${instance.customer_id}-${instance.product_id}`;
    });
  }

  getId({ item_id }) {
    return item_id;
  }

  getAltId({ cart_id }) {
    return cart_id;
  }

  getOrderNow({ buy_now }) {
    return buy_now;
  }

  getAddedAt({ added_on }) {
    return added_on;
  }

  customer() {
    return this.belongsTo('App/Models/Customer');
  }

  product() {
    return this.belongsTo('App/Models/Product');
  }
}

module.exports = ShoppingCart
