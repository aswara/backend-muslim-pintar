const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require('../../models/user');

module.exports = () => { passport.use(new GoogleTokenStrategy({
		// options for google strategy
        clientID: "143170154877-mjt2othfl6kth57ql70m5oij83gh0neo.apps.googleusercontent.com",
        clientSecret: "Ubg37wAX1j_f_IAv91r1e_Rj"
    }, (accessToken, refreshToken, profile, done) => {
    	//check if user already exist in database
    	User.findOne({ googleId: profile.id }).then(currentUser => {
    		if(currentUser){
    			//already have this user
    			done(null, currentUser);
    		} else {
    			//if not, create user in database
    			new User({
    				googleId: profile.id,
    				name: profile.displayName,
    				photo: profile._json.picture,
    				email: profile.emails[0].value
    			}).save().then(newUser => {
    				done(null, newUser)
    			})
    		}
    	})
    }
  ));
}