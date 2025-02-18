import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ContactForm.css';

function ContactForm() {
  const navigate = useNavigate();
  
  // State pour gérer les valeurs du formulaire
  const [formData, setFormData] = useState({
    email: "",
    message: ""
  });

  // State pour afficher le message de succès
  const [successMessage, setSuccessMessage] = useState("");

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
  
    // Validation basique
    if (!formData.email || !formData.message) {
      alert("All fields must be filled!");
      return;
    }
  
    try {
      // Envoi des données au backend
      const response = await axios.post("https://drivingschool-backend.onrender.com/api/contact", formData);
  
      console.log("Message sent:", response.data);
      
      // Afficher le message de succès
      setSuccessMessage("Message sent successfully!");
      
      // Réinitialiser le formulaire
      setFormData({
        email: "",
        message: ""
      });
  
      // Redirection après 2 secondes
      setTimeout(() => {
        navigate("/home-guest");
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };
  return (
    <div className="contact-form-container">
      {successMessage && <Alert variant="success" className="success-alert">{successMessage}</Alert>} {/* Afficher le message de succès */}
      <Form onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <Form.Group className="contact-form-group" controlId="formGroupEmail">
          <Form.Label className="contact-form-label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="contact-form-control"
          />
        </Form.Group>

        <Form.Group className="contact-form-group" controlId="formGroupMessage">
          <Form.Label className="contact-form-label">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5} // Élargir le champ de message
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="contact-form-control"
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="contact-form-button">Send your message</Button>
      </Form>
    </div>
  );
}

export default ContactForm;
