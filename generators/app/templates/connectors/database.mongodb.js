'use strict'

var logger = require('./logger')
var restful = require('node-restful')
var mongoose = restful.mongoose
mongoose.Promise = require('bluebird')

function connectDB (uri, options) {
  var mongoConnection = mongoose.createConnection(uri, options)
  mongoose.connection.on('error', function (err) {
    logger.error('MongoDB Connection Error ' + err)
  })

  mongoose.connection.on('connected', function (suc) {
    logger.info('Successfully connected to MongoDB')
  })

  mongoose.connection.on('disconnected', function (suc) {
    logger.info('Lost MongoDB connection...')
  })

  mongoose.connection.on('reconnected', function (suc) {
    logger.info('Reconnected to MongoDB!')
  })

  return mongoConnection
}

module.exports.connectDB = connectDB
module.exports.mongoose = mongoose
