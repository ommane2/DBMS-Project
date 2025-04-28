const express = require('express');
const { addQuestion, editQuestion, deleteQuestion, getQuestionsByQuiz } =require ('../controllers/questionController.js');
const { protectAdmin } =  require  ('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/', protectAdmin, addQuestion);
router.put('/:questionId', protectAdmin, editQuestion);
router.delete('/:questionId', protectAdmin, deleteQuestion);
router.get('/quiz/:quizId', protectAdmin, getQuestionsByQuiz);

module.exports = router;
