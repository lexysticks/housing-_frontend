import React from "react";
import "./about.css";
import hero2 from "../../assets/service_3.jpg";
import { FaCheck } from "react-icons/fa6";

export default function AboutUs() {
  return (
    <section className="about_us">
      {/* === Text Section === */}
      <div className="about">
        <h2>About Us</h2>
        <p>
          At <strong>Service Apartment Africa</strong>, we simplify property search,
          rentals, and real estate across Africa. <br />
          Our platform connects guests with quality short-let apartments and helps
          buyers find verified properties for sale.
        </p>

        <ul className="check">
          <li>
            <FaCheck className="fa-check" /> Agents create profiles and detailed
            listings.
          </li>
          <li>
            <FaCheck className="fa-check" /> Clients book apartments or request
            property viewings with one click.
          </li>
          <li>
            <FaCheck className="fa-check" /> Secure and seamless online process for
            rentals and real estate deals.
          </li>
        </ul>

        <button className="read_more">
          <a href="#">Read More</a>
        </button>
      </div>

      {/* === Image Section === */}
      <div className="about_img">
        <img src={hero2} alt="About Us" />
      </div>
    </section>
  );
}
