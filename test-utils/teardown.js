const config = require("../src/api/config")
const knex = require("../src/api/utils/database")

module.exports = async globalConfig => {
  // This should clean up to prepare for another test run!
  await knex.raw(`DROP DATABASE ${config.mysql.test_database}`)
  await knex.raw(`CREATE DATABASE ${config.mysql.test_database}`)
  await knex.destroy()
}