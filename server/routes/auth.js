// routes/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'facebookid', // Agreemates App ID
		'clientSecret' 	: 'facebooksecret', // Agreemates App Secret
		'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback' //Agreemates FB callback
	},

	'googleAuth' : {
		'clientID' 		: 'googleID',
		'clientSecret' 	: 'google_scecret
		'callbackURL' 	: 'http://localhost:3000/auth/google/callback'//Agreemates Google callback
	}

};
