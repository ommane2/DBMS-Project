import express from 'express';
import { createQuiz, getAllQuizzes, getQuizDetails, deleteQuiz } from '../controllers/quizController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protectAdmin, createQuiz);
router.get('/', protectAdmin, getAllQuizzes);
router.get('/:quizId', protectAdmin, getQuizDetails);
router.delete('/:quizId', protectAdmin, deleteQuiz);

export default router;
