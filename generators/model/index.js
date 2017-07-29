'use strict';

module.exports = require('yeoman-generator').Base.extend({
  initializing: function(){
    // Argument for creating the model related to the API
    // Expects a string with format <modelName>|<field1>@<fieldType>@<required:true/false>,...
    //this.argument('model', {type:String, default: ""});

  },
  writing: function(){
    // Get global configurations for the generator
    this.appContext = this.config.get('appContext');
    // Get all model info from the argument
    var model = this.args[0].split('|');
    // Copy all model files along with RESTful endpoints to the destination
    if(this.appContext.appDB == "MongoDB"){
      var modelPath = 'model.mongodb.js'
    }
    else{
      var modelPath = 'model.sql.js'
    }
    this.fs.copyTpl(
      this.templatePath(modelPath),
      this.destinationPath('models/' + model[0] + '.js'), {
        modelName: model[0],
        attrConfig: model[1],
        appContext: this.appContext
      }
    );
    // Creates default test archives for testing models
    this.fs.copyTpl(
      this.templatePath('model.spec.js'),
      this.destinationPath('models/test/' + model[0] + '.spec.js'), {
        modelName: model[0],
        attrConfig: model[1],
        appContext: this.appContext
      }
    );
  },
  // Install dependencies
  install: function() {
    this.installDependencies();
  }

})
