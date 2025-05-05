const express = require("express");
const {
  startQuiz,
  submitQuiz,
  getQuizResults,
  getQuizDataByCode,
} = require("../controllers/attemptController.js");
const router = express.Router();

router.post("/start", startQuiz);
router.post("/submit", submitQuiz);
router.get("/results/:quizId", getQuizResults); // admin protected
router.get("/quiz-data/:quizCode", getQuizDataByCode);

module.exports = router;
