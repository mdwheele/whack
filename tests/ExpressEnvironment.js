const NodeEnvironment = require('jest-environment-node')
const app = require('../src/api/app')
const config = require('../src/api/config')

class ExpressEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
  }

  async setup() {
    await super.setup()
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
    await super.teardown()
  }
}

module.exports = ExpressEnvironment