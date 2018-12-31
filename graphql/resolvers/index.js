const categoriesResolver = require('./categories')
const quizResolver = require('./quiz')

const rootResolver = {
	...categoriesResolver,
	...quizResolver
}

module.exports = rootResolver