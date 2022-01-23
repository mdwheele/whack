/** @typedef {import('knex').Knex} Knex */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable('user_channel_assoc', table => {
    table.unique(['user_id', 'channel_id'])
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.alterTable('user_channel_assoc', table => {
    table.dropUnique(['user_id', 'channel_id'])
  })
}
