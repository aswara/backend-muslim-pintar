const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')();

const createToken = (auth) => {
	return jwt.sign({
		id: auth.id
	}, process.env.JWT_SECRET);
};

const generateToken = (req, res, next) => {
	req.token = createToken(req.auth);
	return next();
};

const sendToken = (req, res) => {
    const { name, email, photo, _id } = req.user;
  	return res.status(200).json({
    	token: req.token,
    	user: {
    		_id,
    		name,
    		email,
    		photo,
    	},
  	});
}

router.route('/google')
	.post(passport.authenticate('google-token', {session: false}), (req, res, next) => {
		if(!req.user) {
			return res.send(401, 'User Not Authenticaton')
		}
		req.auth = {
			id: req.user.id
		}

		next();
	},
	generateToken,
	sendToken);

module.exports = router