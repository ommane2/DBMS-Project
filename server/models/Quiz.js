const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: { type: String, unique: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

const Quiz = new mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

