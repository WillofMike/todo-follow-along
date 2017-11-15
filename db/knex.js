const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
require('dotenv').config()

module.exports = require('knex')(config)
