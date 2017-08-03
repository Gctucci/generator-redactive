'use strict'

var utils = {}

utils.hasParams = function (reqFields, body) {
  var check = true
  reqFields.forEach(function (item) {
    if (!body.hasOwnProperty(item)) {
      check = false
    }
  })
  return check
}

module.exports = utils
