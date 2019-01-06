const mongoose = require('mongoose')
const Category = require('../../models/category')
const Quiz = require('../../models/quiz')

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
	category: async args => {
		try {
			const category = await Category.findById(args.id)
			return {
				...category._doc,
				_id: category.id,
				quizzes: quizzes.bind(this, category.id),
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
					quizzes: quizzes.bind(this, category.id),
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