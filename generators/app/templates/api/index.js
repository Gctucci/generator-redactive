/*
 *   * initializes all models and sources them as modelnameModel and all apis as modelnameController
 *     */
var glob = require( 'glob' );

glob('**/*.js', function( err, files ) {
  files.forEach(function(file) {
    if (file !== 'index.js') {
      var splits = file.split('.');
      // Checks if the file analyzed corresponds to a model
      if(splits.length == 3 && splits[1] == "model"){
        // Converts modelname.model to ModelnameModel
        var moduleName = splits[0].charAt(0).toUpperCase() + splits[0].slice(1) + "Model";
        exports[moduleName] = require('./' + splits[0] + "." + splits[1]);
      }
      else if(splits.length == 3 && splits[1] == "controller"){
        // Converts modelname.controller to ModelnameController
        var moduleName = splits[0].charAt(0).toUpperCase() + splits[0].slice(1) + "Controller";
        exports[moduleName] = require('./' + splits[0] + "." + splits[1]);

      }
    }
  });
});
