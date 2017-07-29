var passport = require('passport')
var passportJWT = require('passport-jwt')
var users = require('./models/users.js')
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
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    var user = users.find(function(u) {
      return u.email === email && u.password === password;
    });
    if (user) {
      var payload = {id: user._id};
      var token = jwt.encode(payload, jwtSecret);
      res.json({token: token});
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
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
