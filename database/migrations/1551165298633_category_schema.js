'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  async up() {
    const exists = await this.hasTable('category');
    if (!exists) {
      this.create('category', (table) => {
        table.increments('category_id').primary().unique().notNullable();
        table.string('name').notNullable().index();
        table.text('description');

        table.integer('department_id').unsigned().notNullable()
          .references('department_id').inTable('department');

        table.timestamps()
      });
    }
  }

  down() {
    this.drop('category')
  }
}

module.exports = CategorySchema
