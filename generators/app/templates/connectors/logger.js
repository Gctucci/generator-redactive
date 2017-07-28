/** Required configuration for logging capabilities */

var winston = require('winston')
var fs = require('fs')
var glob = require('glob')
require('winston-mongodb').MongoDB

const logger = new winston.Logger({
  transports: [// display debug info on the console
    new winston.transports.Console({level: 'debug', handleExceptions: true, json: false, colorize: true})],
  exitOnError: false
})

if (process.env.NODE_ENV !== 'production' && process.env.LOG_FILENAME) {
  // Removes all previous log files and then starts logging in new ones
  glob.globSync('**/' + process.env.LOG_FILENAME, function (er, files) {
    if (er) {
      logger.error('Could not find any previous log files, moving on...')
    }
    fs.unlinkSync(files)
  })

  logger.add(winston.transports.File, {
    level: 'debug',
    filename: process.env.LOG_FILENAME,
    json: true,
    timestamp: true,
    colorize: false,
    maxsize: 25000,
    maxFiles: 3
  })
}

if (process.env.NODE_ENV === 'production' && process.env.MONGODB_LOG_NAME) {
  // Adds permanent logging capabilities in case the app is running in prodution
  logger.add(winston.transports.MongoDB, {
    level: 'info',
    db: process.env.MONGODB_LOG_URI,
    safe: true

  })
}

module.exports = logger
