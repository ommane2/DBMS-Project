const Quiz = require("../models/Quiz.js");
const Question = require("../models/Question.js");

exports.addQuestion = async (req, res) => {
  const { quizId, text, options, correctOption } = req.body;

  try {
    const newQuestion = new Question({
      quizId,
      text,
      options,
      correctOption,
    });

    await newQuestion.save();

    // Push question to quiz
    await Quiz.findByIdAndUpdate(quizId, {
      $push: { questions: newQuestion._id },
    });

    res.status(201).json({ message: "New Question Added!!!", newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.editQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { text, options, correctOption } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { text, options, correctOption },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Question Updated Successfully!!", updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Remove from Quiz's question list
    await Quiz.findByIdAndUpdate(question.quizId, {
      $pull: { questions: questionId },
    });

    await question.deleteOne();

    res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getQuestionsByQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    const questions = await Question.find({ quizId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
