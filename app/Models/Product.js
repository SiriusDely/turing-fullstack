'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  static get table() {
    return 'product';
  }

  static get primaryKey() {
    return 'product_id';
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

	static get hidden() {
    return ['product_id', 'discounted_price']
  }

  static get computed() {
    return ['id', 'reducedPrice']
  }

  getId({ product_id }) {
    return product_id;
  }

  getReducedPrice({ discounted_price }) {
    return discounted_price;
  }
}

module.exports = Product
