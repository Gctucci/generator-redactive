'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the slick ' + chalk.red('Redactive') + ' generator!'
    ));
    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What should be your App name?',
        default: 'redactive'
      },
      {
        type: 'input',
        name: 'appDescription',
        message: 'Describe in one paragraph what your app is all about.',
        default: 'A boilerplate for creating webapps with Node.js and its associated technology stack'

      },
      {
        type: 'input',
        name: 'appAuthor',
        message: 'Greats apps deserve a proper author! What is your name?',
        // Default
        default: "Please insert you name - you deserve recognition!"
      },
      {
        type: 'list',
        name: 'appLicense',
        message: 'Insert you app license. Choose wisely!',
        choices: ['MIT','BSD-2-Clause', 'BSD-3-Clause', 'Apache-2.0', 'UNDEFINED']
      },
      {
        type: 'list',
        name: 'appType',
        message: 'What kind of App  are you building?',
        choices: ['Backend','Frontend', 'FullStack']
      },
      {
        type: 'list',
        name: 'appDB',
        message: 'Ok! Now, what type of database do you want?',
        choices: ['MySQL', 'MongoDB', 'SQLite'],
        when: function(answers){
          return answers.appType !== "FrontEnd";
        }
      },
      {
        type: 'confirm',
        name: 'appCache',
        message: 'Do you want to setup a caching system (Redis)?'
      },
      {
        type: 'confirm',
        name: 'appMessaging',
        message: 'Do you want to setup a messaging System (RabbitMQ)?'
      }
    ];

    return this.prompt(prompts).then(function(props){
      this.props = props;
      // Set all variables for being accessed on a sub-generator level
      this.config.set('appContext', {
        appName: this.props.appName,
        appDescription: this.props.appDescription,
        appAuthor: this.props.appAuthor,
        appLicense: this.props.appLicense,
        appType: this.props.appType,
        appDB: this.props.appDB
      })
    }.bind(this));
  },
  writing: function() {
      // Copy all configuration files
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'), {
          appName: this.props.appName,
          appDescription: this.props.appDescription,
          appAuthor: this.props.appAuthor,
          appLicense: this.props.appLicense,
          appType: this.props.appType,
          appDB: this.props.appDB
        }
      );

      // Copy all application files
      this.fs.copyTpl(
        this.templatePath('server.js'),
        this.destinationPath('server.js'), {
          appName: this.props.appName,
          appType: this.props.appType
        }
      );

      this.fs.copyTpl(
        this.templatePath('.eslintrc'),
        this.destinationPath('.eslintrc'), {
          appName: this.props.appName
        }
      );

      this.fs.copyTpl(
        this.templatePath('.eslintignore'),
        this.destinationPath('.eslintignore'), {
          appName: this.props.appName
        }
      );

      this.fs.copyTpl(
        this.templatePath('.babelrc'),
        this.destinationPath('.babelrc'), {
          appName: this.props.appName
        }
      );

      this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'), {
          appName: this.props.appName,
          appType: this.props.appType
        }
      );

      this.fs.copyTpl(
        this.templatePath('webpack.production.js'),
        this.destinationPath('webpack.production.js'), {
          appName: this.props.appName,
          appType: this.props.appType
        }
      );
      // Copy auxiliary connectors and files
      if(this.props.appMessaging){
        this.fs.copyTpl(
          this.templatePath('connectors/messageBroker.js'),
          this.destinationPath('connectors/messageBroker.js'), {
            appName: this.props.appName
          }
        );
      }

      this.fs.copyTpl(
        this.templatePath("connectors/logger.js"),
        this.destinationPath("connectors/logger.js"),
        {
          appName: this.props.appName
        }
      )

      this.fs.copyTpl(
        this.templatePath("logs/"),
        this.destinationPath("logs/")
      )

      if(this.props.appType !== "Frontend"){
        // Copy database files
        if(this.props.appDB === "MySQL"){
          this.fs.copyTpl(
            this.templatePath('connectors/database.sql.js'),
            this.destinationPath('connectors/database.js'), {
              appName: this.props.appName
            }
          );
        }
        else if(this.props.appDB === "MongoDB"){
          this.fs.copyTpl(
            this.templatePath('connectors/database.mongodb.js'),
            this.destinationPath('connectors/database.js'), {
              appName: this.props.appName
            }
          );
        }

        // Copy api folder and optionally the app folder if developing fullstack
        this.fs.copyTpl(
          this.templatePath("api/"),
          this.destinationPath("api/"),
          {
            appName: this.props.appName
          }
        )
        this.fs.copyTpl(
          this.templatePath("models/"),
          this.destinationPath("models/"),
          {
            appName: this.props.appName
          }
        )
        if(this.props.appType === "FullStack"){
          this.fs.copyTpl(
            this.templatePath('app/'),
            this.destinationPath("app/"), {
              appName: this.props.appName
            }
          );
        }
      }

      else{
        this.fs.copyTpl(
          this.templatePath("api/"),
          this.destinationPath("api/"),
          {
            appName: this.props.appName
          }
        )
        this.fs.copyTpl(
          this.templatePath("models/"),
          this.destinationPath("models/"),
          {
            appName: this.props.appName
          }
        )
      }
  },
  // Install dependencies
  install: function() {
    this.installDependencies();
  }

});
