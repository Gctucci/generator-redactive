'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the slick ' + chalk.red('generator-redactive') + ' generator!'
    ));
    var done = this.async();
    this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'What should be your App name?',
        // Defaults to project's folder name
        default: this.appname
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
        choices: ['SQL (MySQL)', 'NoSQL (MongoDB)'],
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
    ],
    function(answers){
      this.props = answers
      this.log(answers);
      done();
    }.bind(this));
}});
