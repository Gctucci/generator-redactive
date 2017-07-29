'use strict'
var restful = require('node-restful')
var mongoose = restful.mongoose

var Group = restful.model('Group', new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 20
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Sets default version of the database, for API handling purposes
  db_version: {
    type: String,
    default: 'v1.0'
  }
}, {timestamps: true})).methods(['get', 'post', 'put', 'delete'])

module.exports = Group
