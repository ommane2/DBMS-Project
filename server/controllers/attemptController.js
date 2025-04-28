const Attempt = require('../models/Attempt.js');
const Quiz = require('../models/Quiz.js');
const Question = require('../models/Question.js')


exports.startQuiz = async (req, res) => {
  const { participantName, code } = req.body;

  try {
    const quiz = await Quiz.findOne({ code }).populate('questions');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const now = new Date();
    if (now < quiz.startTime || now > quiz.endTime) {
      return res.status(400).json({ message: 'Quiz not active' });
    }

    res.json({
      quizId: quiz._id,
      title: quiz.title,
      questions: quiz.questions.map(q => ({
        id: q._id,
        text: q.text,
        options: q.options,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.submitQuiz = async (req, res) => {
  const { quizId, participantName, answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId).populate('questions');

    let score = 0;

    for (let ans of answers) {
      const question = quiz.questions.find(q => q._id.toString() === ans.questionId);
      if (question && question.correctAnswer === ans.selectedOption) {
        score += 1;
      }
    }

    const newAttempt = new Attempt({
      quizId,
      participantName,
      answers,
      score,
    });

    await newAttempt.save();

    res.json({ message: 'Quiz submitted successfully', score });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getQuizResults = async (req, res) => {
  const { quizId } = req.params;

  try {
    const results = await Attempt.find({ quizId }).sort({ score: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
