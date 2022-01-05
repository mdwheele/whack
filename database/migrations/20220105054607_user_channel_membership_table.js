/** @typedef {import('knex').Knex} Knex */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('user_channel_assoc', table => {
    table.increments('id')
    table.integer('user_id').unsigned()
    table.integer('channel_id').unsigned()

    table.foreign('user_id')
      .references('id')
      .inTable('users')

    table.foreign('channel_id')
      .references('id')
      .inTable('channels')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('user_channel_assoc')
}
