//# Logique métier (ex: gestion des utilisateurs, réservations)
//Gestion des utilisateurs (consultation, mise à jour)
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    // throw new Error("Error while Data Recuperation");
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation des champs requis
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }
  try {
    const newUser = new User({
      name,
      email,
      password,
      role,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};
const updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  // Vérifier si l'utilisateur existe
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les champs de l'utilisateur
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password; // En pratique, le mot de passe doit être hashé
    user.role = role || user.role;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};
const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      await user.deleteOne();
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
  };
  const deleteManyUsers = async (req, res) => {
    const { ids } = req.body; // Un tableau d'ID à supprimer
  
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Vous devez fournir un tableau d'ID." });
    }
  
    try {
      // Supprimer les utilisateurs correspondant aux IDs donnés
      const result = await User.deleteMany({ _id: { $in: ids } });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé à supprimer." });
      }
  
      res.status(200).json({ message: `${result.deletedCount} utilisateur(s) supprimé(s)` });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression des utilisateurs", error: error.message });
    }
  };
  

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteManyUsers
};
