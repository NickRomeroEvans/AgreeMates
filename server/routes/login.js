// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		 // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		//login form 
	});

	// process the login form
	// app.post('/login', do all our passport stuff here);

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		//show signup form
	});

	// process the signup form
	// app.post('/signup', do all our passport stuff here);

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		//might just be calendar
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
	}));

	//NOTE THIS PART IS FOR AUTHORIZE NOT AUTHENTICATE
	// send to facebook to authorize
	app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

	// handle the callback after facebook has authorized the user
	app.get('/connect/facebook/callback',
		passport.authorize('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
	}));

	// =====================================
	// GOOGLE ROUTES =======================
	// =====================================
	// send to google to do the authentication
	// profile gets us their basic information including their name
	// email gets their emails
   	 app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}));

    	// the callback after google has authenticated the user
    	app.get('/auth/google/callback',
            	passport.authenticate('google', {
                    	successRedirect : '/profile',
                    	failureRedirect : '/'
        }));

	//NOTE THIS PART IS FOR AUTHORIZE NOT AUTHENTICATE
	// send to google to authorize
	app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

	// the callback after google has authorized the user
	app.get('/connect/google/callback',
		passport.authorize('google', {
			successRedirect : '/profile',
			failureRedirect : '/'
	}));

	app.get('/unlink/facebook', function(req, res) {
        	var user            = req.user;
        	user.facebook.token = undefined;
        	user.save(function(err) {
            		res.redirect('/profile');
        	});
   	 });
	
	// google ---------------------------------
   	 app.get('/unlink/google', function(req, res) {
		var user          = req.user;
	       	user.google.token = undefined;
	       	user.save(function(err) {
	        	res.redirect('/profile');
	      	});
    	});

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

