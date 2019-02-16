'use strict';

const Model = use('Model');

class Department extends Model {
  static get table() {
    return 'department';
  }

  static get primaryKey () {
    return 'department_id';
  }

  static get createdAtColumn () {
    return null;
  }

  static get updatedAtColumn () {
    return null;
  }

  categories() {
    return this.hasMany('App/Models/Category')
  }
}

module.exports = Department;
