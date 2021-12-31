const knex = require('knex')
const config = require('../config')

const connection = knex({
  client: 'mysql2',
  connection: {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port,
    timezone: 'Z'
  },
  pool: {
    min: 2,
    max: 10
  }
})

module.exports = connection