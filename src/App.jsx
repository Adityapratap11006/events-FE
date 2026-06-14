import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBooking from "./pages/AddBooking";
import ShowBooking from "./pages/ShowBooking";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="hero">
          <div className="hero-content">
            <p className="hero-eyebrow">Easy event booking</p>
            <h1>Book events, manage attendees, and stay organized</h1>
            <p className="hero-copy">
              A simple booking website for event registration and reservation management.
              Add new bookings, view existing attendees, and update records in one place.
            </p>
          </div>
        </header>

        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<AddBooking />} />
            <Route path="/add" element={<AddBooking />} />
            <Route path="/show" element={<ShowBooking />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
