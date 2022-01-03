const knex = require('knex')
const knexfile = require('../../../knexfile.js')

const connection = knex(knexfile)

module.exports = connection