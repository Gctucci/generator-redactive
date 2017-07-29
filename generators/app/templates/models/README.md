Models folder
=============
Contains all the database models for storing data and domain info
-----------------------------------------------------------------

This folder contains all models for the database, with the following files:

*	<module_name>.model.js: Contains all the database models for the current domain module.
*	<module_name>.model.spec.js: Contains all the tests regarding database storaging and logic (for instance data validation in the database, etc).


These files can be created automatically by calling yo redactive:model "<module_name>|<attr1_name>:<attr1_type>:<default>:<required>@<attr2_name>..."

For example, to create a user model with a name attribute that is required, one would call:

yo redactive:model "user|name:String:userDefault:required"

When a model is created by the directive above, it is automatically loaded
with a full RESTful interface, provided by the package [node-restful](https://github.com/baugarten/node-restful) The default format for each call is as follows:

GET /<module_name>
GET /<module_name>/:id
POST /<module_name>
PUT /<module_name>/:id
DELETE /<module_name>/:id
