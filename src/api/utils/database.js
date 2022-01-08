const knexfile = require('../../../knexfile.js')
const knex = require('knex').knex(knexfile[process.env.NODE_ENV || 'default'])

module.exports = knex