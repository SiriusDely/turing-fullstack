'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  async up () {
    const exists = await this.hasTable('orders');
    if (!exists) {
      this.create('orders', (table) => {
        table.increments('order_id').primary().unique().notNullable();
        table.decimal('total_amount').notNullable();
        table.timestamp('created_on').notNullable();
        table.timestamp('shipped_on');
        table.integer('status').notNullable().defaultTo(0);
        table.text('comments');
        table.string('auth_code');
        table.string('reference');

        table.integer('customer_id').unsigned().notNullable()
          .references('customer_id').inTable('customer');
        table.integer('shipping_id').unsigned().notNullable()
          .references('shipping_region_id').inTable('shipping_region');
        table.integer('tax_id').unsigned().notNullable()
          .references('tax_id').inTable('customer');

        table.timestamps()
      })
    }
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
