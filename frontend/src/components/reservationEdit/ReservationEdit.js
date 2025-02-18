import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./ReservationEdit.css";

const ReservationEdit = () => {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get("http://localhost:5000/api/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userReservations = response.data.filter(
        (reservation) => reservation.email === userEmail
      );
      setReservations(userReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      const token = localStorage.getItem("authToken");
      try {
        await axios.delete(`http://localhost:5000/api/reservations/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchReservations();
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      await axios.put(
        `http://localhost:5000/api/reservations/${selectedReservation._id}`,
        selectedReservation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReservations();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>My Reservations</h2>
      
      {reservations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <div className="empty-state-text">You don't have any reservations yet.</div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Lesson Type</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.name}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.phone}</td>
                  <td>{new Date(reservation.date).toLocaleDateString()}</td>
                  <td>{reservation.lessonType}</td>
                  <td>{reservation.notes}</td>
                  <td>
                    <Button
                      className="btn btn-primary"
                      onClick={() => handleEdit(reservation)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleDelete(reservation._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={showModal} onHide={handleModalClose} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReservation && (
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedReservation.name}
                  onChange={(e) =>
                    setSelectedReservation({
                      ...selectedReservation,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={selectedReservation.email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedReservation.phone}
                  onChange={(e) =>
                    setSelectedReservation({
                      ...selectedReservation,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedReservation.date.split('T')[0]}
                  onChange={(e) =>
                    setSelectedReservation({
                      ...selectedReservation,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Lesson Type</label>
                <select
                  className="form-control"
                  value={selectedReservation.lessonType}
                  onChange={(e) =>
                    setSelectedReservation({
                      ...selectedReservation,
                      lessonType: e.target.value,
                    })
                  }
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  value={selectedReservation.notes}
                  onChange={(e) =>
                    setSelectedReservation({
                      ...selectedReservation,
                      notes: e.target.value,
                    })
                  }
                />
              </div>

              <button type="submit" className="reservation-button">
                Save Changes
              </button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReservationEdit;