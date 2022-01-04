/** @typedef {import('knex').Knex} Knex */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('channels', table => {
    table.increments('id')
    table.string('rid').unique()
    table.string('name')
    table.integer('owner_id').unsigned()

    table.foreign('owner_id')
      .references('id')
      .inTable('users')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('channels')
}
