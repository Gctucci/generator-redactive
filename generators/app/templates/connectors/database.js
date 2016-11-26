'use strict';

var logger = require('./logger.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


function connectDB(uri, options){

  mongoose.connect(uri, options);
  mongoose.connection.on('error', function(err){

    logger.error('MongoDB Connection Error ' + err);

  });

  mongoose.connection.on('connected', function(suc){

    logger.info('Successfully connected to MongoDB');

  });

  mongoose.connection.on('disconnected', function(suc){

    logger.info('Lost MongoDB connection...');

  });

  mongoose.connection.on('reconnected', function(suc){

    logger.info('Reconnected to MongoDB!');

  });

}





module.exports.connectDB = connectDB;
