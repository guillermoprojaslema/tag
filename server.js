var express = require('express');
var swig 	= require('swig');
var path 	= require('path');
var fs 		= require('fs');

var server = express();

var homeController = require(path.join(
		path.dirname(fs.realpathSync(__filename)), 'app/controllers/home'));
console.log('' + path.join(
		path.dirname(fs.realpathSync(__filename)), 'app/controllers/home') );
homeController(server);

var port = process.env.PORT || 5000;
server.listen(port, function() {

	console.log('Listening on ' + port);
});
