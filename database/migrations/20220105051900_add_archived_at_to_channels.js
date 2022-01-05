/** @typedef {import('knex').Knex} Knex */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable('channels', table => {
    table.datetime('archived_at').index()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.alterTable('channels', table => {
    table.dropColumn('archived_at')
  })
}
