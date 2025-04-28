const express = require('express');
const { startQuiz, submitQuiz, getQuizResults } = require( '../controllers/attemptController.js');
const router = express.Router();

router.post('/start', startQuiz);
router.post('/submit', submitQuiz);
router.get('/results/:quizId', getQuizResults); // admin protected


module.exports = router;
