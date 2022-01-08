const knexfile = require('../../../knexfile.js')[process.env.NODE_ENV || 'default']

const knex = require('knex').knex(knexfile)



module.exports = knex