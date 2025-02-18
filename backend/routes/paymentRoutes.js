const express = require("express");
const router = express.Router();
require("dotenv").config(); // Charger .env avant d'utiliser Stripe
console.log("Clé Stripe (routes) :", process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { amount, currency, paymentMethodId, name } = req.body;

  if (!amount || !currency || !paymentMethodId || !name) {
    return res
      .status(400)
      .json({ error: "Données manquantes pour le paiement." });
  }

  try {
    // Création d'un paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Montant en centimes
      currency,
      payment_method: paymentMethodId,
      confirm: true, // Confirmation immédiate du paiement
      metadata: { name }, // Ajouter le nom à la transaction (métadonnées)
      return_url: "http://localhost:3000/courses", // URL de redirection après paiement réussi
    });

    return res
      .status(200)
      .json({ success: true, message: "Paiement réussi !", paymentIntent });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// // routes/payment.js
// const express = require('express');
// const router = express.Router();
// const Payment = require('../models/Payment');

// router.post('/', async (req, res) => {
//   const { cardNumber, expiryDate, cvv, cardHolderName } = req.body;

//   // Validation des données
//   if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
//     return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
//   }
//   if (!/^\d{16}$/.test(cardNumber)) {
//     return res.status(400).json({ error: 'Le numéro de carte doit comporter 16 chiffres.' });
//   }
//   if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
//     return res.status(400).json({ error: 'La date d\'expiration doit être au format MM/AA.' });
//   }
//   if (!/^\d{3}$/.test(cvv)) {
//     return res.status(400).json({ error: 'Le CVV doit comporter 3 chiffres.' });
//   }

//   try {
//     // Création et enregistrement du paiement dans la base de données
//     const payment = new Payment({
//       cardNumber,
//       expiryDate,
//       cvv,
//       cardHolderName
//     });

//     await payment.save();

//     // Simuler une réponse de paiement réussi
//     return res.status(200).json({ success: true, message: 'Paiement réussi !' });
//   } catch (error) {
//     console.error("Erreur lors du traitement du paiement :", error);
//     return res.status(500).json({ error: 'Erreur serveur lors du traitement du paiement.' });
//   }
// });

// module.exports = router;
