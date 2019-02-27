'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaxSchema extends Schema {
  async up () {
    const exists = await this.hasTable('tax');
    if (!exists) {
      this.create('tax', (table) => {
        table.increments('tax_id').primary().unique().notNullable();
        table.string('tax_type').notNullable();
        table.float('tax_percentage').notNullable();

        table.timestamps()
      })
    }
  }

  down () {
    this.drop('tax')
  }
}

module.exports = TaxSchema
