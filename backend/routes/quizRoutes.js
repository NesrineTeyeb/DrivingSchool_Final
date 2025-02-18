const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

// Obtenir tous les quiz
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// Obtenir un quiz par ID
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz non trouvé" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});



module.exports = router;
