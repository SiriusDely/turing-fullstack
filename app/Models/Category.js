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

  department() {
    return this.belongsTo('App/Models/Department');
  }
}

module.exports = Category;
