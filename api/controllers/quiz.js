const mongoose = require('mongoose')

const Quiz = require('../../models/quiz')
const Category = require('../../models/category')

exports.get_all = (req, res, next) => {
	Quiz.find()
		.exec()
		.then(docs => {
			res.status(200).json(docs)
		})
		.catch(err => {
			res.status(500).json({error: err})
		})
	
}

exports.get_quiz_category = (req, res, next) => {
	const categoryId = req.params.id
	Quiz.find({ categoryId })
		.exec()
		.then(docs => {
			res.status(200).json(docs)
		})
		.catch(err => {
			res.status(500).json({error: err})
		})
}

exports.create_quiz = (req, res, next) => {
	const quiz = new Quiz({
		_id: new mongoose.Types.ObjectId(),
		categoryId: req.body.categoryId,
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
			data: doc
		})
	})
	.catch(err =>{
		res.status(500).json({error : err})
	})
}

exports.get_quiz = (req, res, next) => {
	const id = req.params.id
	Quiz.findById(id)
		.exec()
		.then(doc => {
			if (doc) {
				res.status(200).json(doc)
			} else {
				res.status(404).json({message: 'No valid entry found for provided ID'})
			}
		})
		.catch(err =>{
			res.status(500).json({error : err})
		})
}

exports.update_quiz = (req, res, next) => {
	const id = req.params.id
	const newData = {
		categoryId: req.body.categoryId,
		question: req.body.question,
		answer: req.body.answer,
		a: req.body.a,
		b: req.body.b,
		c: req.body.c,
		d: req.body.d
	}

	Category.update(
		{ _id: id },
		{ $set: newData  })
		.exec()
		.then(result => {
			res.status(200).json({
				message: "Success update",
				data : {
					...newData,
					_id : id
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Failed update",
				error : err
			})
		})
}

exports.delete_quiz = (req, res, next) => {
	const id = req.params.id
	Quiz.deleteOne({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: "Success delete",
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Failed delete",
				error : err
			})
		})
}