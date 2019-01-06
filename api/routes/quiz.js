const express = require('express');
const router = express.Router();

const QuizController = require('../controllers/quiz')

router.get('/', QuizController.get_all)

router.get('/category/:id', QuizController.get_quiz_category)

router.post('/', QuizController.create_quiz)

router.get('/:id', QuizController.get_quiz)

router.put('/:id', QuizController.update_quiz)

router.delete('/:id', QuizController.delete_quiz)

module.exports = router;