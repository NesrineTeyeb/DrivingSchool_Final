const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  lessonType: { type: String, enum: ["Beginner", "Advanced"], required: true },
  notes: { type: String },
});

module.exports = mongoose.model("Reservation", reservationSchema);

