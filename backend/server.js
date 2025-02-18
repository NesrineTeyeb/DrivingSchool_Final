const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const reservationRoutes = require("./routes/reservationRoutes");
const quizRoutes = require("./routes/quizRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const contactRoutes = require("./routes/contactRoutes");
const paymentRoutes=require("./routes/paymentRoutes")
dotenv.config();
// console.log("Clé Stripe :", process.env.STRIPE_SECRET_KEY); 
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur de connexion à MongoDB :", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Page non trouvée" });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

app.get('/', (req, res) => {
  res.send('API is Running ...');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});

// // //  Point d'entrée du backend (serveur Express)
// // // Importation des modules nécessaires
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const reservationRoutes = require("./routes/reservationRoutes");
// const quizRoutes= require("./routes/quizRoutes")

// dotenv.config();

// const app = express();

// // Middleware
// // app.use(cors());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Routes
// app.use("/api/reservations", reservationRoutes);
// app.use("/api/quizzes", quizRoutes);

// // Error handling
// app.use((req, res, next) => {
//   const error = new Error("Page non trouvée");
//   error.status = 404;
//   next(error);
// });

// app.use((err, req, res, next) => {
//   const statusCode = err.status || 500;
//   res.status(statusCode).json({
//     message: err.message || "Erreur interne du serveur",
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
