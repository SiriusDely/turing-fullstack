'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttributeSchema extends Schema {
  async up() {
    const exists = await this.hasTable('attribute');
    if (!exists) {
      this.create('attribute', (table) => {
        table.increments('attribute_id').primary().unique().notNullable();
        table.string('name').index();
        table.timestamps();
      });
    }
  }

  down() {
    this.drop('attribute')
  }
}

module.exports = AttributeSchema
