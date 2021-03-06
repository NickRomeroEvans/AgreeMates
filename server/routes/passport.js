// Authentication routes

'use strict';

module.exports = function(app, passport) {

  // facebook authentication
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope : 'email'
    })
  );

  // facebook authentication callback
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/'
    })
  );

  app.get('/auth/facebook/invite/:invite', function(req, res, next) {
    passport.authenticate('facebook', {
      callbackURL : '/auth/facebook/callback/'+req.params.invite,
      scope : 'email'
    })(req, res, next);
  });

  app.get('/auth/facebook/callback/:invite', function(req, res, next) {
    passport.authenticate('facebook', {
      callbackURL : '/auth/facebook/callback/'+req.params.invite,
      successRedirect : '/invitations/'+req.params.invite,
      failureRedirect : '/'
    })(req, res, next);
  });

  // log out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // google authentication
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
    })
  );

  // google authentication
  app.get('/auth/google/invite/:invite', function(req, res, next) {
    req.session.redirectUrl = '/invitations/'+req.params.invite;
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
    })(req, res, next);
  });

  // google authentication callback
  app.get('/auth/google/callback', function(req, res, next) {
    passport.authenticate('google', function(err, user) {
      var redirectUrl = '/';

      if (err) { return next(err); }
      if (!user) { return res.redirect('/'); }

      if (req.session.redirectUrl) {
        redirectUrl = req.session.redirectUrl;
        req.session.redirectUrl = null;
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
      });
      res.redirect(redirectUrl);
    })(req, res, next);
  });

  // unlink facebook
  app.get('/unlink/facebook', function(req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      if (err) {

      } else {
        res.redirect('/profile');
      }
    });
  });

  // unlink google
  app.get('/unlink/google', function(req, res) {
    var user = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      if (err) {

      } else {
        res.redirect('/profile');
      }
    });
  });
};

// check if a user is logged in
// function isLoggedIn(req, res, next) {
// 	if (req.isAuthenticated()) {
// 		return next();
// 	}
//
// 	res.redirect('/');
// }
