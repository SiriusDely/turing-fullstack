'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  async up() {
    const exists = await this.hasTable('product');
    if (!exists) {
      this.create('product', (table) => {
        table.increments('product_id').primary().unique().notNullable();
        table.string('name').notNullable().index();
        table.text('description').index();
        table.decimal('price').notNullable();
        table.decimal('discounted_price').notNullable();
        table.string('thumbnail').notNullable();
        table.string('image').notNullable();
        table.string('image_2');
        table.integer('display').defaultTo(0);
        table.timestamps()
      });
    }
  }

  down() {
    this.drop('product')
  }
}

module.exports = ProductSchema
