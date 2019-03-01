'use strict'

const Database = use('Database');
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ShoppingCartSchema extends Schema {
  async up() {
    // alter table
    const exists = await Database.schema.hasColumn('shopping_cart', 'customer_id');
    if (!exists) {
      this.table('shopping_cart', (table) => {
        table.integer('customer_id').unsigned().notNullable()
          .references('customer_id').inTable('customer');
      });
    }
  }

  async down() {
    /* reverse alternations
    const exists = await Database.schema.hasColumn('shopping_cart', 'customer_id');
    if (exists) {
      this.table('shopping_cart', (table) => {
        table.dropColumn('customer_id');
      });
    }
    */
  }
}

module.exports = ShoppingCartSchema
