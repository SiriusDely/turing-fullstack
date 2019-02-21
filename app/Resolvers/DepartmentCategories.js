'use strict';

const Department = use('App/Models/Department');
const Category = use('App/Models/Category');

const DepartmentCategories = {
  Query: {
    async departments() {
      const departments = await Department.all();
      return departments.toJSON();
    },

    async categories(_, args) {
      console.log('DepartmentCategories.categories.args', args);
      const categories = await Category.all();
      return categories.toJSON();
    }
  }
};

module.exports = DepartmentCategories;
