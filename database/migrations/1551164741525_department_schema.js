'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentSchema extends Schema {
  up () {
    this.createIfNotExists('department', (table) => {
      table.increments('department_id').primary().unique().notNullable();
      table.string('name').notNullable().index();
      table.text('description');
      table.timestamps()
    })
  }

  down () {
    this.drop('department')
  }
}

module.exports = DepartmentSchema
