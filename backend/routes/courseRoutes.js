const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Récupérer tous les cours
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Ajouter un nouveau cours
router.post("/", async (req, res) => {
  try {
    const { title, description, videoUrl } = req.body;
    const newCourse = new Course({ title, description, videoUrl });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: "Impossible d'ajouter le cours" });
  }
});

module.exports = router;
