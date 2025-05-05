const Attempt = require("../models/Attempt.js");
const Quiz = require("../models/Quiz.js");
const Question = require("../models/Question.js");

exports.startQuiz = async (req, res) => {
  const { participantName, code } = req.body;

  try {
    const quiz = await Quiz.findOne({ code }).populate("questions");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const now = new Date();
    if (now < quiz.startTime || now > quiz.endTime) {
      return res.status(400).json({ message: "Quiz not active" });
    }

    res.status(200).json({
      quizId: quiz._id,
      title: quiz.title,
      questions: quiz.questions.map((q) => ({
        id: q._id,
        text: q.text,
        options: q.options,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.submitQuiz = async (req, res) => {
  const { quizId, participantName, answers } = req.body;

  try {
  // Step 1: Find quiz by code
  const quiz = await Quiz.findOne({ code: quizId });
  if (!quiz) {
  return res.status(404).json({ message: "Quiz not found" });
  }
  
  // Step 2: Get all questions for the quiz
  const questions = await Question.find({ quizId: quiz._id });
  
  let score = 0;
  
  for (let ans of answers) {
    const question = questions.find(
      (q) => q.id.toString() === ans.questionId
    );
    if (question && question.correctOption === ans.selectedOption) {
      score += 1;
    }
  }
  
  // Step 3: Save attempt
  const newAttempt = new Attempt({
    quizId: quiz._id,
    participantName,
    answers,
    score,
  });
  
  await newAttempt.save();
  
  res.status(201).json({ message: "Quiz submitted successfully", score });
  } catch (error) {
  console.error("Submit Quiz Error:", error);
  res.status(500).json({ message: "Server Error" });
  }
  };

exports.getQuizResults = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Count total number of questions in the quiz
    const totalQuestions = await Question.countDocuments({ quizId });

    // Fetch all attempts for this quiz
    const attempts = await Attempt.find({ quizId })
      .sort({ submittedAt: -1 })
      .lean();

    const participants = attempts.map((attempt) => ({
      id: attempt._id.toString(),
      name: attempt.participantName,
      score: attempt.score,
      totalQuestions,
      submittedAt: attempt.submittedAt,
    }));

    // Response structure
    const result = {
      quizId: quiz._id.toString(),
      quizTitle: quiz.title,
      participants,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getQuizDataByCode = async (req, res) => {
  
  try {
    const { quizCode } = req.params;
    // Find the quiz using the unique code
    const quiz = await Quiz.findOne({ code: quizCode });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Fetch related questions
    const questions = await Question.find({ quizId: quiz._id }).select(
      "questionText options"
    );

    // Format response
    const formattedQuiz = {
      id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      code: quiz.code,
      timeLimit: quiz.timeLimit || 600, // fallback to 10 mins if not set
      questions: questions.map((q) => ({
        id: q._id,
        questionText: q.questionText,
        options: q.options,
      })),
    };

    res.status(200).json(formattedQuiz);
  } catch (error) {
    console.error("Error getting quiz data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
