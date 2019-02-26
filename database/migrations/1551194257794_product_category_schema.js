'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductCategorySchema extends Schema {
  async up() {
    const exists = await this.hasTable('product_category');
    if (!exists) {
      this.create('product_category', (table) => {
        table.integer('product_id').unsigned().notNullable()
          .references('product_id').inTable('product');
        table.integer('category_id').unsigned().notNullable()
          .references('category_id').inTable('category');

        table.timestamps();
      });
    }
  }

  down() {
    this.drop('product_category');
  }
}

module.exports = ProductCategorySchema;
