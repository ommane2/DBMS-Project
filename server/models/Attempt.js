const mongoose = require('mongoose')

const attemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  participantName: { type: String, required: true },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, selectedOption: Number }],
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

const Attempt = new mongoose.model('Attempt', attemptSchema);
module.exports = Attempt;
