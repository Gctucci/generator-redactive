'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = [
  {
    devtool: 'eval-source-map',
    entry: {
<% if (appType === 'Backend') { %>
      // Server configuration
      server: [
        'babel-polyfill',
        path.join(__dirname, 'server.js')
      ]
<% } else { %>
      // Client configuration
      client: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'server.js')
      ]
<% }%>
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name].js',
      publicPath: '/',
      libraryTarget: 'commonjs2'
    },
    plugins: [
<% if (appType !==  'Backend') { %>
      new HtmlWebpackPlugin({template: 'app/public/index.tpl.html', inject: 'body', filename: 'index.html'}),
<% } %>
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.APP_NAME': JSON.stringify('<%= appName %>'),
      'process.env.APP_PORT': 3000,
      'process.env.APP_HOST': JSON.stringify('localhost'),
      'process.env.LOG_FILENAME': JSON.stringify('logger_data'),
      'process.env.DB_URI':JSON.stringify('mongodb://localhost:27017/<%= appName %>')
      })
    ],
    eslint: {
      configFile: '.eslintrc',
      failOnWarning: false,
      failOnError: false
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel'
        }, {
          test: /\.json?$/,
          loader: 'json'
        }, {
          test: /\.scss$/,
          loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        }, {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff'
        }, {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }, {
          test: /\.md$/,
          loader: 'ignore-loader'
        }
      ]
    }
  }
]
