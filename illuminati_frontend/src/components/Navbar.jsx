import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/masons_logo.jpg";
import { navItems } from "../config/navbar";
import { getUserRoles } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const userRoles = getUserRoles();

  const visibleItems = navItems.filter(item =>
    item.roles.some(role => userRoles.includes(role))
  );

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
        {visibleItems.map(item => (
          <a key={item.name} href={item.href}>{item.name}</a>
        ))}
      </div>

      <div className="nav-right">
        <button onClick={handleLogout} className="nav-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}


