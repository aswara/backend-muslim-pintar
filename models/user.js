const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
	googleId: {
		type: String,
		default: null,
		require: false,
	},
	email: {
		type: String, require: true,
		trim: true, unique: true,
	},
	name: {
		type: String,
		require: true,
	},
	photo: {
		type: String,
		default: null,
		require: false,
	},
	password: {
		type: String,
		default: null,
		require: false,
	}
    
});

module.exports = mongoose.model('User', userSchema);