const mongoose = require('mongoose')
const Category = require('../../models/category')
const Quiz = require('../../models/quiz')

const quizzes = async category => {
	try {
		const quizzes = await Quiz.find({ category })
		return quizzes.map(quiz => {
			return {
				...quiz._doc,
				_id: quiz.id,
			}
		})
		return quizzes
	} catch (err) {
		throw err
	}
}

module.exports = {
	category: async args => {
		try {
			const category = await Category.findById(args.id)
			return {
				...category._doc,
				_id: category.id,
				quizzes: quizzes.bind(this, category.name),
			}
		} catch (err) {
			throw err
		}
	},
	categories: async () => {
		try {
			const categories = await Category.find()
			return categories.map(category => {
				return {
					...category._doc,
					_id: category.id,
					quizzes: quizzes.bind(this, category.name),
				}
			})
			return categories
		} catch (err) {
			throw err
		}
	},
	createCategory: async args => {
		const category = new Category({
			_id: new mongoose.Types.ObjectId(),
			name: args.categoryInput.name
		})
		let createdCategory
		try {
			const result = await category.save()
			createdCategory = {
				...result._doc,
				_id: result._doc._id.toString()
			}
			return createdCategory
		} catch (err) {
			throw  err
		}
	},
	deleteCategory: async args => {
		try {
			const category = await Category.findById(args.id)
			await Category.deleteOne({_id: args.id})
			return {
				...category._doc,
				_id: category.id
			}
		} catch (err) {
			throw err
		}
	},
	
}