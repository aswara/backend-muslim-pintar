const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

//route RESTful api
const categoryRoutes = require('./api/routes/categories');
const quizRoutes = require('./api/routes/quiz');
const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/user');

//graphql api
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

//connect database
mongoose.connect("mongodb://root:" + process.env.MONGO_ATLAS_PW + "@quiz-shard-00-00-saphf.mongodb.net:27017,quiz-shard-00-01-saphf.mongodb.net:27017,quiz-shard-00-02-saphf.mongodb.net:27017/test?ssl=true&replicaSet=quiz-shard-0&authSource=admin&retryWrites=true",
	{
		useNewUrlParser: true
	}
);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//cors
app.use(cors());
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*")
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
// 	)
// 	next()
// })

// error url
// app.use((req, res, next) =>{
// 	const error = new Error('Not found');
// 	error.status = 404;
// 	next(error)
// })

// app.use((error, req, res, next) =>{
// 	res.status(error.status || 500)
// 	res.json({
// 		error: {
// 			message: error.message
// 		}
// 	})
// })

//routes RESTful API
app.use('/api/category', categoryRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


//route Graphql
app.use('/graphql', graphqlHTTP({
	schema: graphQlSchema,
	rootValue: graphQlResolvers,
	graphiql: true
}));


module.exports = app;