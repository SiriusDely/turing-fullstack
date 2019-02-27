'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ShippingRegion extends Model {
  static get table() {
    return 'shipping_region';
  }

  static get primaryKey () {
    return 'shipping_region_id';
  }

  static get createdAtColumn () {
    return null;
  }

  static get updatedAtColumn () {
    return null;
  }

  static get computed() {
    return ['id'];
  }

  getId({ shipping_region_id }) {
    return shipping_region_id;
  }

  customers() {
    return this.hasMany('App/Models/Customer');
  }
}

module.exports = ShippingRegion
