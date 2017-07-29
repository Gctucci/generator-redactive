'use strict'

var logger = require('./logger')
var restful = require('node-restful')
var mongoose = restful.mongoose
mongoose.Promise = require('bluebird')

var isConnectedBefore = false

function connectDB(uri) {

  mongoose.connection.on('disconnected', function() {
    logger.warn('[DB] Lost MongoDB connection, trying again...')
    if (!isConnectedBefore) {
      connectDB()
    }
  })
  mongoose.connection.on('connected', function() {
    isConnectedBefore = true
  })

  mongoose.connection.on('reconnected', function() {
    logger.info('[DB] Reconnected to MongoDB!')
})

  return mongoose.connect(process.env.DB_URI, {
    server: {
      auto_reconnect: true
    }
  }, function(err) {
    if (err) {
      logger.error('[DB] Failed to connect to mongo on startup - retrying in a few seconds... ', err)
      setTimeout(connectDB, process.env.DB_RECONNECT_TIME)
    } else {
      logger.info('[DB] Successfully connected to MongoDB at ' + process.env.DB_URI)
    }
  })
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Force to close the MongoDB conection')
    process.exit(0)
  })
})
module.exports.connectDB = connectDB
module.exports.mongoose = mongoose
