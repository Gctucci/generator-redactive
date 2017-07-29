require('babel-register')

var express = require('express')
var webpack = require('webpack')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var morgan = require('morgan')
var config = require('./webpack.config')
var logger = require('./connectors/logger')
var db = require('./connectors/database')
var models = require('./models')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  // Load Hot Reloading and Development servers in dev mode
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: '/', // config.output.publicPath,
    serverSideRender: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      hot: true
    }
  })
  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
}

// Connects automatically to the database
<% if (appDB === 'MongoDB'){ %>
db.connectDB()
<% } %>
// Configure Restful API, along with Morgan analytics/logs
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({'extended': 'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
app.use(methodOverride())

//  Register all API RESTful endpoints with <modelName> as default routing
for (var m of models.names){
  app.resource = models[m + 'Model']
  models[m + 'Model'].register(app, '/api/' + m)
  logger.info("[API] Registered API /api/" + m);
}
<% if (appAuthentication) {%>
  // Registers user authentication and JWT token
  var auth = require('./auth')
  app.use(auth.authStrategy().initialize())
  // Registers route to JWT token
  app.post('/auth/token', auth.getTokenAPI)
<% } %>
<% if (appType !== 'Backend'){ %>
// Configure react to be loaded on root url
app.get('/', function(req, res) {
  /* Use React Router */
  var ReactRouter = require('react-router')
  var match = ReactRouter.match
  var routes = require('./app/frontend.routes.js').routes

  match({
    routes: routes,
    location: req.url
  }, function(error, redirectLocation, renderProps) {
    /* Send response */
    // TODO: Finish response for the frontend app
  })
})
<% } %>

// Configure Port for listening to requests
app.listen(process.env.APP_PORT || 3000, function(err) {
  if (err) {
    logger.error('[BACKEND] Could not start server: ' + err)
  } else {
    logger.info('[BACKEND] Listening in port %s', process.env.APP_PORT || 3000)
  }
})

module.exports = app
