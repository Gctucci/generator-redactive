Models folder
=============
Contains all the database models for storing data and domain info
-----------------------------------------------------------------

This folder contains all models for the database, with the following files:

*	<module_name>.model.js: Contains all the database models for the current domain module.
*	<module_name>.model.spec.js: Contains all the tests regarding database storaging and logic (for instance data validation in the database, etc).


These files can be created automatically by calling yo redactive:model "<modelName>|<attribute1Name>:<attribute1Type>:<defaultValue>:<required>@<attribute2Name>..."

For example, to create a user model with a name attribute that is required, one would call:

yo redactive:model "user|name:String:userDefault:required"
