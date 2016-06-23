var express = require('express');
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');

var app = express();

// configure Express
app.set('views', './views');
app.set('view engine', 'pug');

app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

var passport = require('passport');
var facebook = require('./app/models/facebook')

// /// Requiring modules
// var db = require('./app/models/database')

///static folders
app.use(express.static('./public'));

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
