const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Route pour gérer l'envoi du formulaire de contact
router.post("/", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Enregistrement du message dans la base de données
    const newContact = new Contact({ email, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent and saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

module.exports = router;
