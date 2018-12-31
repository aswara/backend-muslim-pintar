const { buildSchema } = require('graphql');

module.exports = buildSchema(`
	type Category {
		_id: ID!
		name: String!
		quizzes: [Quiz!] 
	}

	type Quiz {
		_id: ID!
		category: String!
		question: String!
		answer: String!
		a: String!
		b: String!
		c: String!
		d: String!
	}

	input CategoryInput {
		name: String!
	}

	input QuizInput {
		category: String!
		question: String!
		answer: String!
		a: String!
		b: String!
		c: String!
		d: String!
	}

	type RootQuery {
		category(id: ID!): Category!
		quiz(id: ID!): Quiz!
		categories: [Category!]
		quizzes: [Quiz!]
	}

	type RootMutation {
		createCategory(categoryInput: CategoryInput): Category
		deleteCategory(id: ID!): Category!
		createQuiz(quizInput: QuizInput): Quiz
		deleteQuiz(id: ID!): Quiz!
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`)