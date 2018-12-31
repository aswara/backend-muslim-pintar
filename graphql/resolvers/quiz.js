const mongoose = require('mongoose')
const Quiz = require('../../models/quiz')


module.exports = {
	quiz: async args => {
		try {
			const quiz = await Quiz.findById(args.id)
			return {
				...quiz._doc,
				_id: quiz.id
			}
		} catch (err) {
			throw err
		}
	},
	quizzes: async () => {
		try {
			const quizzes = await Quiz.find()
			return quizzes.map(quiz => {
				return {
					...quiz._doc,
					_id: quiz.id
				}
			})
			return quizzes
		} catch (err) {
			throw err
		}
	},
	createQuiz: async args => {
		const quiz = new Quiz({
			_id: new mongoose.Types.ObjectId(),
			category: args.quizInput.category,
			question: args.quizInput.question,
			answer: args.quizInput.answer,
			a: args.quizInput.a,
			b: args.quizInput.b,
			c: args.quizInput.c,
			d: args.quizInput.d,
		})
		let createdQuiz
		try {
			const result = await quiz.save()
			createdQuiz = {
				...result._doc,
				_id: result._doc._id.toString()
			}
			return createdQuiz
		} catch (err) {
			throw  err
		}
	},
	deleteQuiz: async args => {
		try {
			const quiz = await Quiz.findById(args.id)
			await Quiz.deleteOne({_id: args.id})
			return {
				...quiz._doc,
				_id: quiz.id
			}
		} catch (err) {
			throw err
		}
	},
	
}