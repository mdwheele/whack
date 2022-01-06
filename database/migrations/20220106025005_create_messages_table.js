/** @typedef {import('knex').Knex} Knex */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('messages', table => {
    table.increments('id')
    table.string('rid').unique()
    table.integer('channel_id').unsigned()
    table.integer('author_id').unsigned()
    table.text('body')
    table.timestamps()

    table.foreign('channel_id')
      .references('id')
      .inTable('channels')

      table.foreign('author_id')
        .references('id')
        .inTable('users')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('messages')
}
