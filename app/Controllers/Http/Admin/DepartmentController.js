'use strict';

const Department = use('App/Models/Department');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with departments
 */
class DepartmentController {
  /**
   * Show a list of all departments.
   * GET departments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ view }) {
    // response.send({ greeting: 'Hello world in JSON' });
    const departments = await Department.query()
      .select('*').orderBy('department_id', 'asc').fetch();

    return view.render('admin.departments.index', { departments: departments.toJSON() });
  }

  /**
   * Render a form to be used for creating a new department.
   * GET departments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ view }) {
    return view.render('admin.departments.edit')
  }

  /**
   * Create/save a new department.
   * POST departments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'description'])
    const department = await Department.create(data);

    // return response.redirect('/admin/departments');
    return response.route('departments.index');
  }

  /**
   * Display a single department.
   * GET departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing department.
   * GET departments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const { id } = params;
    const department = await Department.findOrFail(id);
    // console.log('DepartmentController.edit', department);
    return view.render('admin.departments.edit', { department: department.toJSON() })
  }

  /**
   * Update department details.
   * PUT or PATCH departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params;
    const { name, description } = request.all();

    // console.log('DepartmentController.update', request.all());

    const department = await Department.findOrFail(id);
    department.merge({ name, description });
    await department.save();

    // console.log('DepartmentController.update', department);

    return response.route('departments.index');
  }

  /**
   * Delete a department with id.
   * DELETE departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = DepartmentController
