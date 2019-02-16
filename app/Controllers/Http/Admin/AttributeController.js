'use strict';

const Attribute = use('App/Models/Attribute');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with attributes
 */
class AttributeController {
  /**
   * Show a list of all attributes.
   * GET attributes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const attributes = await Attribute.query()
      .select('*').orderBy('attribute_id', 'asc').fetch();

    return view.render('admin.attributes.index', { attributes: attributes.toJSON() });
  }

  /**
   * Render a form to be used for creating a new attribute.
   * GET attributes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('admin.attributes.edit')
  }

  /**
   * Create/save a new attribute.
   * POST attributes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name'])
    const attribute = await Attribute.create(data);
    return response.route('attributes.index');
  }

  /**
   * Display a single attribute.
   * GET attributes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing attribute.
   * GET attributes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const { id } = params;
    const attribute = await Attribute.findOrFail(id);
    return view.render('admin.attributes.edit', { attribute: attribute.toJSON() })
  }

  /**
   * Update attribute details.
   * PUT or PATCH attributes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params;
    const { name, description } = request.all();
    const attribute = await Attribute.findOrFail(id);
    attribute.merge({ name, description });
    await attribute.save();
    return response.route('attributes.index');
  }

  /**
   * Delete a attribute with id.
   * DELETE attributes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AttributeController
