'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShippingRegionSchema extends Schema {
  async up () {
    const exists = await this.hasTable('shipping_region');
    if (!exists) {
      this.create('shipping_region', (table) => {
        table.increments('shipping_region_id').primary().unique().notNullable();
        table.string('shipping_region').unique().notNullable();
        table.timestamps()
      });
    }
  }

  down () {
    this.drop('shipping_region')
  }
}

module.exports = ShippingRegionSchema
