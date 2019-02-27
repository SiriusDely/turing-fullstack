'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static get primaryKey() {
    return 'order_id';
  }

  static get createdAtColumn() {
    return created_on;
  }

  static get updatedAtColumn() {
    return shipped_on;
  }

  static get computed() {
    return ['id']
  }

  getId({ order_id }) {
    return order_id;
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
}

module.exports = Order
