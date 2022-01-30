const NodeEnvironment = require('jest-environment-node')
const express = require('express')
const app = require('../src/api/app')
const config = require('../src/api/config')
const knex = require('../src/api/utils/database')
const fs = require('fs')
const http = require('http')
const https = require('https')
const { attachWebSocketServer } = require('../src/api/socket')

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
      // Create an Express app to forward 80 to 443.
      // const httpApp = express()

      // httpApp.get('*', (req, res) => {
      //   res.redirect(`https://${config.server.hostname}:${config.server.port}`)
      // })

      // const httpServer = http.createServer(httpApp)
      // httpServer.listen(80)

      server = https.createServer({
        key: fs.readFileSync('var/ssl/whack_chat.key'),
        cert: fs.readFileSync('var/ssl/whack_chat.crt'),
        minVersion: 'TLSv1.2'
      }, app)

      attachWebSocketServer(server)

      server.listen(0, config.server.hostname, resolve)
    })

    this.global.server = server
    this.global.address = `https://${config.server.hostname}:${server.address().port}`
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