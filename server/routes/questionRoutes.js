const express = require("express");
const {
  addQuestion,
  editQuestion,
  deleteQuestion,
  getQuestionsByQuiz,
} = require("../controllers/questionController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware, addQuestion);
router.put("/:questionId", authMiddleware, editQuestion);
router.delete("/:questionId", authMiddleware, deleteQuestion);
router.get("/quiz/:quizId", authMiddleware, getQuestionsByQuiz);

module.exports = router;
