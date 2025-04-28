import express from 'express';
import { addQuestion, editQuestion, deleteQuestion, getQuestionsByQuiz } from '../controllers/questionController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protectAdmin, addQuestion);
router.put('/:questionId', protectAdmin, editQuestion);
router.delete('/:questionId', protectAdmin, deleteQuestion);
router.get('/quiz/:quizId', protectAdmin, getQuestionsByQuiz);

export default router;
