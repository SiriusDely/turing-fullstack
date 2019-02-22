'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Category extends Model {
  static get table() {
    return 'category';
  }

  static get primaryKey () {
    return 'category_id';
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

  getId({ category_id }) {
    return category_id;
  }

  department() {
    return this.belongsTo('App/Models/Department');
  }

  products() {
    return this.belongsToMany(
      'App/Models/Product',
      'category_id',
      'product_id',
      'category_id',
      'product_id'
    ).pivotTable('product_category');
  }
}

module.exports = Category;
