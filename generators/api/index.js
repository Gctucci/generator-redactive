'use strict';

module.exports = require('yeoman-generator').Base.extend({
  initializing: function(){
    // Argument for creating the model related to the API
    // Expects a string with format <modelName>|<field1>:<fieldType>:<required:true/false>,...
    this.argument('modelapi', {type:String, default: ""});

  },
  writing: function(){
    // Get global configurations for the generator
    this.appContext = this.config.get('appContext');
    // Get all model info from the argument
    var model = this.args[0].split('|');

    // Copy all model files along with RESTful endpoints to the destination
    this.fs.copyTpl(
      this.templatePath('model.js'),
      this.destinationPath('api/' + model[0] + "/" + model[0] + '.model.js'), {
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
