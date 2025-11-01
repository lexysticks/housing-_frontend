import React from "react";
import { FaCheck } from "react-icons/fa";


import "./About.css";

export default function About() {
  return (
    <section className="about_us">
      {/* Text Section */}
      <div className="about">
        <h2>About Us</h2>
        <p>
          At Service Apartment Africa, we simplify property search, rentals, and
          real estate across Africa. Our platform connects guests with quality
          short-let apartments and helps buyers find verified properties for
          sale. Whether you’re renting for a few days or investing long-term,
          we make the process seamless and secure.
        </p>

        <ul className="check">
          <li>
            <FaCheck className="fa-check" /> Verified Apartments & Properties
          </li>
          <li>
            <FaCheck className="fa-check" /> Easy Booking & Transparent Pricing
          </li>
          <li>
            <FaCheck className="fa-check" /> Trusted by Renters & Landlords
          </li>
          <li>
            <FaCheck className="fa-check" /> Secure Payment & Quick Support
          </li>
        </ul>

        <button className="read_more">
          <a href="#">Read More</a>
        </button>
      </div>

      {/* Image Section */}
      <div className="about_img">
        <img src={img108} alt="About Service Apartment Africa" />
      </div>
    </section>
  );
}

