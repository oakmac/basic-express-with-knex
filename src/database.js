const log = require('./logging.js')
const dbConfigs = require('../knexfile.js')

log.info('Connecting to the database ...')
const db = require('knex')(dbConfigs.development)
db.raw('SELECT 1')
  .then(function (result) {
    log.info('Successfully connected to the database ')
  })
  .catch(function (err) {
    log.error('Unable to connect to the database!')
  })

// -----------------------------------------------------------------------------
// Public API

module.exports = {
  db: db
}
