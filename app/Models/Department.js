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

  static get computed() {
    return ['id']
  }

  getId({ department_id }) {
    return department_id;
  }

  categories() {
    return this.hasMany('App/Models/Category')
  }

}

module.exports = Department;
