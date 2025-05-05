const express = require('express');
const { createQuiz, getAllQuizzes, getQuizDetails, deleteQuiz } =  require ('../controllers/quizController.js');
const authMiddleware =  require ('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/', authMiddleware, createQuiz);
router.get('/', authMiddleware, getAllQuizzes);
router.get('/:quizId', authMiddleware, getQuizDetails);
router.delete('/:quizId', authMiddleware, deleteQuiz);

module.exports = router;


