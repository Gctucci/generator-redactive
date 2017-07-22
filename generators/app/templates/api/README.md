Api folder
==========
Contains all the API enpoints for getting data within a particular database
---------------------------------------------------------------------------

This folder is divided in a series of files, each one corresponding to one data domain endpoint. For instance, an API that involves
user creation and another one that handles authentication can be grouped together in an 'user' folder.

Each domain subfolder (for instance 'user') contains the following files:

*	index.js: Main point of entry of the API module, contains all the Express REST routes regarding this particular component.
*	<module_name>.controller.js: Contains all the logic regarding each REST routes. It is where the main functionalities of the API lies.
*	<module_name>.integration.js: Contains all the API integration tests (calls to the RESTful routes).

