import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowBooking.css";

const API_BASE = "https://events-be-awy8.onrender.com";

const ShowBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");

  const fetchBookings = () => {
    axios
      .get(`${API_BASE}/get`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.replace("T", " ");
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE}/delete/${id}`)
      .then(() => setBookings(bookings.filter((b) => b._id !== id)))
      .catch((err) => console.error("Error deleting:", err));
  };

  const openModal = (booking) => {
    setSelectedId(booking._id);
    setName(booking.name);
    setEvent(booking.event);
    setTime(booking.time);
    setPhone(booking.phone);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_BASE}/update/${selectedId}`, { name, event, time, phone })
      .then(() => {
        fetchBookings();
        closeModal();
      })
      .catch((err) => console.error("Error updating:", err));
  };

  return (
    <div className="records-container">
      <div className="records-card">
        <h2>All Bookings</h2>
        <p className="records-subtitle">Manage your event reservations here.</p>
        <div className="table-wrapper">
          <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Event</th>
              <th>Date</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id || booking.name}>
                  <td>{booking.name}</td>
                  <td>{booking.event}</td>
                  <td>{formatTime(booking.time)}</td>
                  <td>{booking.phone}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-update" onClick={() => openModal(booking)}>
                        Update
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(booking._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No bookings found.</td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Booking</h3>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Event"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                required
              />
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="btn-update">
                  Save
                </button>
                <button type="button" className="btn-delete" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooking;
