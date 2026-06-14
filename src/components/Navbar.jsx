import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          EventBook
        </Link>
        <div className="navbar-links">
          <Link to="/add" className="navbar-link">
            Add Booking
          </Link>
          <Link to="/show" className="navbar-link">
            Show Bookings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
