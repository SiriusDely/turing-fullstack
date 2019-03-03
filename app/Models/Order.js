'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static get primaryKey() {
    return 'order_id';
  }

  static get createdAtColumn() {
    return 'created_on';
  }

  static get updatedAtColumn() {
    return null;
  }

  static get computed() {
    return ['id', 'shippedAt', 'amountTotal'];
  }

  getId({ order_id }) {
    return order_id;
  }

  getShippedAt({ shipped_on }) {
    return shipped_on;
  }

  getAmountTotal({ total_amount }) {
    return total_amount;
  }

  customer() {
    return this.belongsTo('App/Models/Customer');
  }

  shippingRegion() {
    return this.belongsTo('App/Models/ShippingRegion');
  }

  tax() {
    return this.belongsTo('App/Models/Tax');
  }

  items() {
    return this.hasMany('App/Models/OrderDetail');
  }
}

module.exports = Order
