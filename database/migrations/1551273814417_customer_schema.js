'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  async up() {
    const exists = await this.hasTable('customer');
    if (!exists) {
      this.create('customer', (table) => {
        table.increments('customer_id').primary().unique().notNullable();
        table.string('name', 80).notNullable().unique();
        table.string('email', 254).notNullable().unique();
        table.string('password', 60).notNullable();
        table.text('credit_card');
        table.string('address_1');
        table.string('address_2');
        table.string('city');
        table.string('region');
        table.string('postal_code');
        table.string('country');
        table.string('day_phone');
        table.string('eve_phone');
        table.string('mob_phone');

        table.integer('shipping_region_id').unsigned().notNullable()
          .references('shipping_region_id').inTable('shipping_region');

        table.timestamps()
      })
    }
  }

  down() {
    this.drop('customer')
  }
}

module.exports = CustomerSchema
