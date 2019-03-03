'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class OrderDetail extends Model {
  static get table() {
    return 'order_detail';
  }

  static get primaryKey() {
    return 'item_id';
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  static get computed() {
    return [ 'id', 'costUnit', 'nameProduct' ];
  }

  getId({ item_id }) {
    return item_id;
  }

  getCostUnit({ unit_cost }) {
    return unit_cost;
  }

  getNameProduct({ product_name }) {
    return product_name;
  }

  product() {
    return this.belongsTo('App/Models/Product');
  }

  order() {
    return this.belongsTo('App/Models/Order');
  }
}

module.exports = OrderDetail;
