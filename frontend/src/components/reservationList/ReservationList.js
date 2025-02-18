import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReservationList = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Récupérer les réservations de l'utilisateur
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reservations");
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  // Replanifier une réservation
  const handleReplanification = async (reservationId, newDate) => {
    try {
      const updatedReservation = await axios.put(
        `http://localhost:5000/api/reservations/${reservationId}`,
        { date: newDate }
      );
      setReservations((prev) =>
        prev.map((r) =>
          r._id === reservationId ? updatedReservation.data : r
        )
      );
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  // Annuler une réservation
  const handleCancelReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
      setReservations((prev) => prev.filter((r) => r._id !== reservationId));
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Reservations</h2>

      {loading ? (
        <p>Loading reservations...</p>
      ) : (
        <div>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div key={reservation._id} className="reservation-card">
                <p><strong>Name:</strong> {reservation.name}</p>
                <p><strong>Email:</strong> {reservation.email}</p>
                <p><strong>Phone:</strong> {reservation.phone}</p>
                <p><strong>Date:</strong> {reservation.date}</p>
                <p><strong>Lesson Type:</strong> {reservation.lessonType}</p>
                <p><strong>Notes:</strong> {reservation.notes}</p>

                <button
                  onClick={() => {
                    // Logique pour ouvrir un formulaire de replanification
                    setSelectedReservation(reservation);
                    navigate(`/replanifier/${reservation._id}`);
                  }}
                >
                  Reschedule
                </button>

                <button
                  onClick={() => handleCancelReservation(reservation._id)}
                >
                  Cancel
                </button>
              </div>
            ))
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
