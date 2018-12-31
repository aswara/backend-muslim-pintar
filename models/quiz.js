const mongoose = require('mongoose')

const quizSchema =  mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	question: {
	    type: String,
		required: true
	},
	answer: {
	    type: String,
		required: true
	},
	a: {
	    type: String,
		required: true
	},
	b: {
	    type: String,
		required: true
	},
	c: {
	    type: String,
		required: true
	},
	d: {
	    type: String,
		required: true
	},
	category: {
	    type: String,
		required: true
	},
})

module.exports = mongoose.model('Quiz', quizSchema)