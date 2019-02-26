'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttributeValueSchema extends Schema {
  async up() {
    const exists = await this.hasTable('product');
    if (!exists) {
      this.create('attribute_value', (table) => {
        table.increments('attribute_value_id').primary().unique().notNullable();
        table.string('value').notNullable().index();

        table.integer('attribute_id').unsigned().notNullable()
          .references('attribute_id').inTable('attribute');

        table.timestamps()
      });
    }
  }

  down () {
    this.drop('attribute_value')
  }
}

module.exports = AttributeValueSchema
