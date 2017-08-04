var logger = require('../connectors/logger')
var utils = require('./utils')
var passport = require('passport')
var passportJWT = require('passport-jwt')
var users = require('../models/users.js')
var jwt = require('jwt-simple') // used to create, sign, and verify tokens

var ExtractJwt = passportJWT.ExtractJwt
var Strategy = passportJWT.Strategy

// Gets the default secret
var jwtSecret = JSON.stringify(process.env.JWT_SECRET) || 'testSecretAPIToken'
var authConfig = {}

var params = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
}

authConfig.getTokenAPI = function(req, res) {
  var params = ['email', 'password']
  if (utils.hasParams(params, req.body)) {
    var email = req.body.email
    var password = req.body.password
    users.findOne({"email": email}).then(function(user) {
      if (user) {
        user.comparePassword(password, function(err, auth) {
          if (err) {
            logger.error('[API] Error while getting the password: ' + err)
            res.json({'error': 'Unexpected error. Please try again later'})
          } else if (auth) {
            var payload = {
              id: user._id
            }
            var token = jwt.encode(payload, jwtSecret)
            res.json({token: token})
          } else {
            res.json({'error': 'Wrong email/password. Please try again'})
          }
        })
      } else {
        logger.error('[AUTH] Failed to authenticate with email=' + email)
        res.status(401).send({'error': 'No user found with these credentials'})
      }
    })
  } else {
    res.status(401).send({
      'error': 'Malformed request. Please provide the fields: ' + params
    })
  }
}

authConfig.authStrategy = function() {
  var strategy = new Strategy(params, function(payload, done) {
    var user = users[payload.id] || null
    if (user) {
      return done(null, {id: user._id})
    } else {
      return done(new Error('User not found'), null)
    }
  })
  passport.use(strategy)
  return {
    initialize: function() {
      return passport.initialize()
    },
    authenticate: function() {
      return passport.authenticate('jwt', cfg.jwtSession)
    }
  }
}

module.exports = authConfig
