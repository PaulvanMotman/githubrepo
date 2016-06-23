const express = require('express');
var router = express.Router();
// var db = require('../app/models/database');

function ensureAuthenticated(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated()) { return next(); }
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/login')
}

module.exports = function(passport){

  router.get('/', function(req, res){
    res.render('index', { user: req.user });
  });

  router.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
  });

  router.get('/login', function(req, res){
    res.render('login', { user: req.user });
  });

  // GET /auth/github
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in GitHub authentication will involve redirecting
  //   the user to github.com.  After authorization, GitHub will redirect the user
  //   back to this application at /auth/github/callback
  router.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });

  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function will be called,
  //   which, in this example, will redirect the user to the home page.
  router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


  return router;
}
