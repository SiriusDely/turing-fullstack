'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  static boot() {
    super.boot()
    this.addHook('beforeSave', async (customerInstance) => {
      if (customerInstance.dirty.password) {
        customerInstance.password = await Hash.make(customerInstance.password)
      }
    })
  }

  static get table() {
    return 'customer';
  }

  static get primaryKey() {
    return 'customer_id';
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  static get computed() {
    return ['id']
  }

  getId({ customer_id }) {
    return customer_id;
  }

  shippingRegion() {
    return this.belongsTo('App/Models/ShippingRegion');
  }
}

module.exports = Customer
