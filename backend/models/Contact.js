const mongoose = require("mongoose");

// Définition du schéma de contact
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Ajoute la date de création automatiquement
  },
});

// Création du modèle Contact basé sur le schéma
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
