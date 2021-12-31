const knex = require('knex')
const knexfile = require('../../../knexfile.js')

const connection = knex(knexfile.application)

module.exports = connection