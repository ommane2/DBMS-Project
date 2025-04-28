import express from 'express';
import { startQuiz, submitQuiz, getQuizResults } from '../controllers/attemptController.js';
const router = express.Router();

router.post('/start', startQuiz);
router.post('/submit', submitQuiz);
router.get('/results/:quizId', getQuizResults); // admin protected

export default router;
