'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShoppingCartSchema extends Schema {
  async up () {
    const exists = await this.hasTable('shopping_cart');
    if (!exists) {
      this.create('shopping_cart', (table) => {
        table.increments('item_id').primary().unique().notNullable();
        table.string('cart_id', 32).notNullable();
        table.string('attributes').notNullable();
        table.integer('quantity').notNullable();
        table.boolean('buy_now').notNullable().defaultTo(true);
        table.timestamp('added_on').notNullable();

        table.integer('product_id').unsigned().notNullable()
          .references('product_id').inTable('product');

        table.integer('customer_id').unsigned().notNullable()
          .references('customer_id').inTable('customer');

        table.timestamps()
      })
    }
  }

  down () {
    this.drop('shopping_cart')
  }
}

module.exports = ShoppingCartSchema
