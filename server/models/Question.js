const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true }  // 0,1,2,3 index based
});

const Question = new mongoose.model('Question', questionSchema);
module.exports = Question;
