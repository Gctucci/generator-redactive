// Load `*.js` under current directory as properties
// i.e., `User.js` will become `exports['UserModel']` or `exports.UserModel`
const path = require('path')
const fs = require('fs')

var fnames = []

fs.readdirSync(path.join(__dirname, '/')).forEach(function (file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '')
    exports[name + 'Model'] = require('./' + file)
    fnames.push(name)
  }
})

exports['names'] = fnames
