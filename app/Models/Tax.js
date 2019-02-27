'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tax extends Model {
  static get table() {
    return 'tax';
  }

  static get primaryKey() {
    return 'tax_id';
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  static get computed() {
    return [ 'id', 'type', 'percentage' ];
  }

  getId({ tax_id }) {
    return tax_id;
  }

  getType({ tax_type }) {
    return tax_type;
  }

  getPercentage({ tax_percentage }) {
    return tax_percentage;
  }
}

module.exports = Tax
