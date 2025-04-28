const express = require('express');
const { createQuiz, getAllQuizzes, getQuizDetails, deleteQuiz } =  require ('../controllers/quizController.js');
const { protectAdmin } =  require ('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/', protectAdmin, createQuiz);
router.get('/', protectAdmin, getAllQuizzes);
router.get('/:quizId', protectAdmin, getQuizDetails);
router.delete('/:quizId', protectAdmin, deleteQuiz);

module.exports = router;


