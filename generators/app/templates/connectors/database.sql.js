'use strict';

var logger = require('./logger');
var Sequelize = require('sequelize');


function connectDB(uri, options){

  var sequelize = new Sequelize(uri, options);
  // Test the connection with the database
  sequelize
    .authenticate()
    .then(function(err) {
      logger.info('SQL Connection has been established successfully.');
    })
    .catch(function (err) {
      logger.info('Unable to connect to the SQL database:', err);
    });
  return sequelize;
}


module.exports.connectDB = connectDB;





