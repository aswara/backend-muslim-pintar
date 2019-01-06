const mongoose = require('mongoose')
const Quiz = require('../../models/quiz')
const Category = require('../../models/category')

const category = async categoryId => {
	console.log("tess")
	try {
		const category = await Category.findById(categoryId)
		return {
			...category._doc,
			_id: category.id,
			quizzes : quizzes.bind(this, category.id)
		}
	} catch (err) {
		throw err
	}
}

const quizzes = async categoryId => {
	try {
		const quizzes = await Quiz.find({ categoryId })
		return quizzes.map(quiz => {
			return {
				...quiz._doc,
				_id: quiz.id,
				categoryId: quiz.categoryId.toString(),
				category: category.bind(this, quiz.categoryId.toString())
			}
		})
	} catch (err) {
		throw err
	}
}

module.exports = {
	quiz: async args => {
		try {
			const quiz = await Quiz.findById(args.id)
			return {
				...quiz._doc,
				_id: quiz.id,
				categoryId: quiz.categoryId.toString(),
				category: category.bind(this, quiz.categoryId)
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
					_id: quiz.id,
					categoryId: quiz.categoryId.toString(),
					category: category.bind(this, quiz.categoryId)
				}
			})
		} catch (err) {
			throw err
		}
	},
	createQuiz: async args => {
		const quiz = new Quiz({
			_id: new mongoose.Types.ObjectId(),
			categoryId: args.quizInput.categoryId,
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
				_id: result._doc._id.toString(),
				categoryId: result._doc.categoryId.toString(),
				category: category.bind(this, result._doc.categoryId.toString())
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
				_id: quiz.id,
				categoryId: quiz.categoryId.toString(),
				category: category.bind(this, quiz.categoryId)
			}
		} catch (err) {
			throw err
		}
	},
	
}