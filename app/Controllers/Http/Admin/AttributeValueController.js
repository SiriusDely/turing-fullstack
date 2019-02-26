'use strict'

const { validateAll } = use('Validator');

const Attribute = use('App/Models/Attribute');
const AttributeValue = use('App/Models/AttributeValue');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with attributevalues
 */
class AttributeValueController {
  rules() {
    return {
      value: 'required'
    }
  }

  /**
   * Show a list of all attributevalues.
   * GET attributevalues
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params, view }) {
    const { attributes_id: attribute_id } = params;

    let values = AttributeValue.query()
      .select('*').with('attribute').orderBy('attribute_value_id', 'asc');

    let attribute = null;
    if (attribute_id) {
      values.where('attribute_id', attribute_id);
      attribute = await Attribute.findOrFail(attribute_id);
    }

    values = await values.fetch();

    return view.render('admin.attribute-values.index', {
      values: values.toJSON(),
      attribute: attribute ? attribute.toJSON() : null
    });
  }

  /**
   * Render a form to be used for creating a new attributevalue.
   * GET attributevalues/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const attributes = await Attribute.query()
      .select(['attribute_id', 'name']).orderBy('name').fetch();
    return view.render('admin.attribute-values.edit', { attributes: attributes.toJSON() })
  }

  /**
   * Create/save a new attributevalue.
   * POST attributevalues
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ session, request, response }) {
    const validation = await validateAll(request.all(), this.rules());

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect('back');
    }

    const data = request.only(['value', 'attribute_id'])
    const value = await AttributeValue.create(data);
    return response.route('attribute-values.index');
  }

  /**
   * Display a single attributevalue.
   * GET attributevalues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing attributevalue.
   * GET attributevalues/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const { id } = params;
    const value = await AttributeValue.findOrFail(id);

    const attribute = await value.attribute().fetch();
    const attributes = await Attribute.query()
      .select(['attribute_id', 'name']).orderBy('name').fetch();

    return view.render('admin.attribute-values.edit', {
      value: value.toJSON(),
      attribute: attribute ? attribute.toJSON() : null,
      attributes: attributes.toJSON()
    });
  }

  /**
   * Update attributevalue details.
   * PUT or PATCH attributevalues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ session, params, request, response }) {
    const validation = await validateAll(request.all(), this.rules());

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect('back');
    }

    const { id } = params;
    const { value, attribute_id } = request.all();

    const aValue = await AttributeValue.findOrFail(id);
    aValue.merge({ value, attribute_id });
    await aValue.save();

    return response.route('attribute-values.index');
  }

  /**
   * Delete a attributevalue with id.
   * DELETE attributevalues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, session }) {
    const { id } = params;

    const aValue = await AttributeValue.findOrFail(id);
    await aValue.delete();

    session.flash({ notification: `Attribute Value deleted: ${ aValue.value }.` })
    return response.route('attribute-values.index');
  }
}

module.exports = AttributeValueController
