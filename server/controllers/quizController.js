const Quiz = require('../models/Quiz.js');
const { generateCode } = require('../utils/generateCode.js');
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
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getQuizDetails = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    await Quiz.findByIdAndDelete(quizId);
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
