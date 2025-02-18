import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap"
import "./SignUp.css"; // Assure-toi d'importer le fichier CSS

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!name || !email || !password || !confirmPassword) {
      setError("Tous les champs sont requis");
      return;
    }

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setSuccessMessage("Inscription réussie !");
        setError(""); // Réinitialiser les erreurs
        setTimeout(() => navigate("/login"), 2000); // Redirection après succès
      }
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setSuccessMessage(""); // Réinitialiser le message de succès
    }
  };

  return (
    <div className="signup-container">
      <h2>SignUp</h2>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button className="submit-button" type="submit">Sign Up</Button>
      </form>
      <p>
        Déjà un compte ? <a href="/login">Connect here</a>
      </p>
    </div>
  );
}

export default SignUp;
