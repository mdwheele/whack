/** @typedef {import('knex').Knex} Knex */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable('channels', table => {
    table.unique('name')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.alterTable('channels', table => {
    table.dropUnique('name')
  })
}
