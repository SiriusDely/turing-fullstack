'use strict';

const Department = use('App/Models/Department');
const Category = use('App/Models/Category');

const DepartmentCategories = {
  Query: {
    async departments() {
      const departments = await Department.query().select('*').orderBy('name').fetch();
      return departments.toJSON();
    },

    async categories(_, { departmentId }) {
      let categories = Category.query().select('*')
          .orderBy('name');
      if (departmentId) {
        categories = categories.where('department_id', departmentId);
      }
      categories = await categories.fetch();
      return categories.toJSON();
    }
  },

  Department: {
    async categories(departmentJson) {
      const department = new Department();
      department.newUp(departmentJson);

      const categories = await department.categories().fetch();
      return categories.toJSON();
    }
  },

  Category: {
    async department(categoryJson) {
      const category = new Category();
      category.newUp(categoryJson);

      const department = await category.department().fetch();
      return department.toJSON();
    }
  }
};

module.exports = DepartmentCategories;
