var util = require('util');
var GitHubStrategy = require('passport-github2').Strategy;
var app = require('./app/models/express');
var passport = require('passport');
var express = require('express')

///static folders
app.use(express.static('./public'));

var github = require('./app/models/github')
// Initialize Passport!  Also use passport.session() middleware, to support

// Initialize Router
var routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// This part tells the app to listen to a server
var server = app.listen(3000, function (){
	console.log ('Blog Application listening on: ' + server.address().port)
});
