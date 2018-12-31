const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Quiz = require('../../models/quiz')
const Category = require('../../models/category')

router.get('/', (req, res, next) => {
	Quiz.find()
		.exec()
		.then(docs => {
			res.status(200).json(docs)
		})
		.catch(err => {
			res.status(500).json({error: err})
		})
	
})

router.post('/', (req, res, next) =>{
	const quiz = new Quiz({
		_id: new mongoose.Types.ObjectId(),
		category: req.body.category,
		question: req.body.question,
		answer: req.body.answer,
		a: req.body.a,
		b: req.body.b,
		c: req.body.c,
		d: req.body.d
	})
	quiz.save()
	.then(doc => {
		res.status(201).json({
			message: 'Success add quiz',
			data: quiz
		})
	})
	.catch(err =>{
		res.status(500).json({error : err})
	})
});

module.exports = router;