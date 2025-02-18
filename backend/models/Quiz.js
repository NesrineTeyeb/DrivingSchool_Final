const mongoose = require("mongoose");

const QuizzSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],// Liste des choix
      correctAnswer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Quizz", QuizzSchema);
