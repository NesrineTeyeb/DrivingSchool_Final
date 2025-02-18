const Reservation = require("../models/Reservation");

//Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json({ message: "Reservation successful!", reservation: newReservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

////Create a new reservation + check if ce créneau est déja reservé
// exports.createReservation = async (req, res) => {
//   try {
//     const { userId, date, timeSlot } = req.body;
//     // Vérifier si le créneau est déjà réservé
//     const existingReservation = await Reservation.findOne({ date, timeSlot });
//     if (existingReservation) {
//       return res.status(400).json({ error: "Ce créneau est déjà réservé !" });
//     }

//     // Créer la réservation
//     const newReservation = new Reservation({ date, timeSlot, userId });
//     await newReservation.save();

//     res
//       .status(201)
//       .json({ message: "Réservation confirmée", reservation: newReservation });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route pour récupérer les créneaux réservés d'une date donnée
exports.getReservedSlots = async (req, res) => {
  try {
    const { date } = req.query; // Récupère la date depuis la requête

    if (!date) {
      return res.status(400).json({ message: "La date est requise" });
    }

    const reservations = await Reservation.find({ date });

    // Extraire les créneaux horaires réservés
    const reservedSlots = reservations.map((res) => res.timeSlot);

    res.json(reservedSlots);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Get a single reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReservation)
      return res.status(404).json({ message: "Reservation not found" });
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReservation)
      return res.status(404).json({ message: "Reservation not found" });
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
