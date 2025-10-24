import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/masons_logo.jpg";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.clear();
    navigate("/entry");
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
        <span className="nav-title">MyApp</span>
      </div>

      <div className="nav-center">
        <a href="#">Report</a>
        <a href="#">Vote</a>
        <a href="#">Invite</a>
        <a href="#">Broadcast Emails</a>
      </div>

      <div className="nav-right">
        <button onClick={handleLogout} className="nav-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}


