import { useState } from "react";
import { NavLink } from "react-router-dom";4
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => setMenuActive(!menuActive);

  const closeMenu = () => setMenuActive(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <NavLink to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" width="120" />
        </NavLink>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Nav Links */}
      <div className={`nav-links ${menuActive ? "active" : ""}`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          HOME
        </NavLink>
        <NavLink
          to="/about"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/rent"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          RENT
        </NavLink>
        <NavLink
          to="/buy"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          BUY
        </NavLink>
        <NavLink
          to="/shortlet"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          SHORTLETS
        </NavLink>
        <NavLink
          to="/land"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          LANDS
        </NavLink>
        <NavLink
          to="/contact"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          CONTACT
        </NavLink>

        <button className="login-btn" onClick={closeMenu}>
          LOGIN
        </button>
      </div>
    </nav>
  );
}

