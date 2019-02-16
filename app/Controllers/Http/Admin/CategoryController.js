'use strict';

const Category = use('App/Models/Category');
const Department = use('App/Models/Department');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response, view }) {
    const { departments_id: department_id } = params;

    let categories = Category.query()
      .select('*').with('department').orderBy('category_id', 'asc');

    let department = null;
    if (department_id) {
      categories.where('department_id', department_id);
      department = await Department.findOrFail(department_id);
    }

    categories = await categories.fetch();

    return view.render('admin.categories.index', {
      categories: categories.toJSON(),
      department: department ? department.toJSON() : null
    });
  }

  /**
   * Render a form to be used for creating a new category.
   * GET categories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ view }) {
    const departments = await Department.query()
      .select(['department_id', 'name']).orderBy('name').fetch();

    return view.render('admin.categories.edit', { departments: departments.toJSON() })
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'description', 'department_id'])
    const category = await Category.create(data);

    return response.route('categories.index');
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const { id } = params;
    const category = await Category.findOrFail(id);

    const department = await category.department().fetch();
    const departments = await Department.query()
      .select(['department_id', 'name']).orderBy('name').fetch();

    return view.render('admin.categories.edit', {
      category: category.toJSON(),
      department: department.toJSON(),
      departments: departments.toJSON()
    });
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params;
    const { name, description, department_id } = request.all();

    const category = await Category.findOrFail(id);
    category.merge({ name, description, department_id });
    await category.save();

    return response.route('categories.index');
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CategoryController
