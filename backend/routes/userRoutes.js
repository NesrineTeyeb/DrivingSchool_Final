// # Routes API (auth, users, reservations)
// Routes de gestion des utilisateurs
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Récupérer tous les utilisateurs
router.get("/", userController.getAllUsers);

// Récupérer un utilisateur par son ID
router.get("/:id", userController.getUserById);

// Créer un nouvel utilisateur
router.post("/", userController.createUser);

// Mettre à jour un utilisateur
router.put("/:id", userController.updateUser);

// Supprimer un utilisateur
router.delete("/:id", userController.deleteUser);
// Route pour supprimer plusieurs utilisateurs
router.delete("/many", userController.deleteManyUsers);

module.exports = router;
