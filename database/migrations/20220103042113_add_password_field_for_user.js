/** @typedef {import('knex').Knex} Knex */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable('users', table => {
    table.text('password', 'mediumtext')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.alterTable('users', table => {
    table.dropColumn('password')
  })
}
