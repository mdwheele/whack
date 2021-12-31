const config = require('./src/api/config')

module.exports = {
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
  },
  migrations: {
    directory: 'database/migrations',
    stub: 'database/migrations/template.stub'
  },
  seeds: {
    directory: 'database/seeds'
  }
}