'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attribute extends Model {
  static get table() {
    return 'attribute';
  }

  static get primaryKey () {
    return 'attribute_id';
  }

  static get createdAtColumn () {
    return null;
  }

  static get updatedAtColumn () {
    return null;
  }

  static get computed() {
    return ['id']
  }

  getId({ attribute_id }) {
    return attribute_id;
  }

  values() {
    return this.hasMany('App/Models/AttributeValue')
  }
}

module.exports = Attribute;
