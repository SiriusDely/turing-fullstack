'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OrderDetailSchema extends Schema {
  async up() {
    const exists = await this.hasTable('order_detail');
    if (!exists) {
      this.create('order_detail', (table) => {
        table.increments('item_id').primary().unique().notNullable();
        table.string('attributes').notNullable();
        table.string('product_name').notNullable();
        table.integer('quantity').notNullable();
        table.decimal('unit_cost').notNullable();

        table.integer('product_id').unsigned().notNullable()
          .references('product_id').inTable('product');

        table.integer('order_id').unsigned().notNullable()
          .references('order_id').inTable('orders');

        table.timestamps();
      });
    }
  }

  down() {
    this.drop('order_detail');
  }
}

module.exports = OrderDetailSchema;
