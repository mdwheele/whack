const config = require("../src/api/config")
const knex = require("../src/api/utils/database")

module.exports = async globalConfig => {
  // Create test database...
  await knex.raw(`DROP DATABASE ${config.mysql.test_database}`)
  await knex.raw(`CREATE DATABASE ${config.mysql.test_database}`)
  await knex.raw(`USE ${config.mysql.test_database}`)

  // Run migrations...
  await knex.migrate.latest()

  // Run seeds...
  await knex.seed.run()
}