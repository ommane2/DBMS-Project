const Attempt = require("../models/Attempt.js");
const Quiz = require("../models/Quiz.js");
const Question = require("../models/Question.js");

const { generateCode } = require("../utils/generateCode.js");

exports.createQuiz = async (req, res) => {
  const { title, description, startTime, endTime } = req.body;

  try {
    const code = generateCode();

    const newQuiz = new Quiz({
      title,
      description,
      startTime,
      endTime,
      code,
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz Created Successfully!!", newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    // Fetch all quizzes
    const quizzes = await Quiz.find({}).lean();

    const enrichedQuizzes = await Promise.all(
      quizzes.map(async (quiz) => {
        const questionCount = await Question.countDocuments({
          quizId: quiz._id,
        });
        const participantCount = await Attempt.countDocuments({
          quizId: quiz._id,
        });

        return {
          id: quiz._id.toString(),
          title: quiz.title,
          description: quiz.description,
          code: quiz.code,
          startTime: quiz.startTime,
          endTime: quiz.endTime,
          questions: questionCount,
          participants: participantCount,
        };
      })
    );

    res.status(200).json(enrichedQuizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getQuizDetails = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    // Delete all related questions
    await Question.deleteMany({ quizId });

    // Delete all related attempts
    await Attempt.deleteMany({ quizId });

    // Delete the quiz
    await Quiz.findByIdAndDelete(quizId);

    res.status(200).json({ message: "Quiz and related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
