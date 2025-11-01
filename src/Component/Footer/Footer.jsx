import "./Footer.css";
import logo from "../../assets/logo.png";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="ftn">
        {/* === About === */}
        <div className="apartment">
          <div className="apart">
            <img src={logo} alt="logo" width="40px" />
            <h2>Apartment</h2>
          </div>
          <p className="ftn_p">
            We’re a high-standard, African-focused platform connecting landlords,
            buyers, and renters across Africa. Our mission is to make renting,
            buying, and listing both short-lets and properties simple, secure, and
            accessible for everyone. Whether you’re listing a home, selling a
            property, finding a place to stay, or a property to buy,
            <strong> Service Apartment Africa</strong> is your trusted partner.
          </p>
        </div>

        {/* === Quick Links === */}
        <div className="quick_link">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">› Home</a></li>
            <li><a href="#">› About Us</a></li>
            <li><a href="#">› Apartment</a></li>
            <li><a href="#">› Contact</a></li>
          </ul>
        </div>

        {/* === Get in Touch === */}
        <div className="get_touch">
          <h2>Get In Touch</h2>
          <ul>
            <li><FaLocationDot /> Arlington, Texas, USA</li>
            <li><FaLocationDot /> Lagos, Nigeria</li>
            <li><FaPhone /> <a href="tel:+2348143727933">+234 8143 727933</a></li>
            <li><FaPhone /> <a href="tel:+2349048123636">+234 9048 123636</a></li>
            <li><FaEnvelope /> <a href="mailto:info@serviceapartment.africa">info@serviceapartment.africa</a></li>
          </ul>
        </div>

        {/* === Follow Us === */}
        <div className="follow_up">
          <h2>Follow Us</h2>
          <p>
            Stay updated and connected with us on social media for the latest
            listings and updates.
          </p>
          <div className="social">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <hr />
      <p className="ftn_copy">
        &copy; 2025 All Rights Reserved by SERVICE APARTMENT.
      </p>
    </footer>
  );
}
