const knex = require('../src/api/utils/database')

async function assertDatabaseCount(table, numberOfRows) {
  const records = await knex(table)
  expect(records).toHaveLength(numberOfRows)
}

async function assertDatabaseHas(table, fields = {}) {
  const records = await knex(table).where(fields)
  expect(records.length).toBeGreaterThan(0)
}

async function assertDatabaseMissing(table, fields = {}) {
  const records = await knex(table).where(fields)
  expect(records).toHaveLength(0)
}

module.exports = {
  assertDatabaseCount,
  assertDatabaseHas,
  assertDatabaseMissing
}
