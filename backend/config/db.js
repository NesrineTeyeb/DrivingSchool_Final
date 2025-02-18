// # Fichiers de configuration (connexion DB, variables d'environnement)
// # Connexion à MongoDB
const mongoose = require("mongoose");
const connecytDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Success MongoDB Connexion");
  } catch (error) {
    console.error("Error Connexion to MongoDB", error);
    process.exit(1);
  }
};
module.exports=connecytDB;

