const NodeEnvironment = require('jest-environment-node')
const app = require('../src/api/app')
const config = require('../src/api/config')
const knex = require('../src/api/utils/database')

class ExpressEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
  }

  async setup() {
    await super.setup()

    // Create test database...
    await knex.raw(`DROP DATABASE ${config.mysql.test_database}`)
    await knex.raw(`CREATE DATABASE ${config.mysql.test_database}`)
    await knex.raw(`USE ${config.mysql.test_database}`)

    // Run migrations...
    await knex.migrate.latest()

    // Run seeds...
    await knex.seed.run()

    let server

    // Start Express server...
    await new Promise(resolve => {
      server = app.listen(0, config.server.hostname, resolve)
    })

    this.global.server = server
    this.global.address = `http://${config.server.hostname}:${server.address().port}`
  }

  async teardown() {
    this.global.server.close()

    // This should clean up to prepare for another test run!
    await knex.raw(`DROP DATABASE ${config.mysql.test_database}`)
    await knex.raw(`CREATE DATABASE ${config.mysql.test_database}`)

    await super.teardown()
  }
}

module.exports = ExpressEnvironment