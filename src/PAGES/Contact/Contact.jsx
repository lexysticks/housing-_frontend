import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./contactpage.css";
import hero2 from "../../assets/contact-last.jpg";

// Hook for scroll fade animation
function useScrollFade(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animate once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);
}

export default function Contactpage() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const mapRef = useRef(null);
  const formRef = useRef(null);

  // Apply scroll animations
  useScrollFade(heroRef);
  useScrollFade(cardsRef);
  useScrollFade(mapRef);
  useScrollFade(formRef);

  // Initialize Leaflet map
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (mapContainer && !mapContainer._leaflet_id) {
      const map = L.map("map").setView([6.5244, 3.3792], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      L.marker([6.5244, 3.3792])
        .addTo(map)
        .bindPopup("Hello from Lagos!")
        .openPopup();

      return () => map.remove();
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="why_choose_us opacity-0" ref={heroRef}>
        <div className="choose_pro">
          <h1>CONTACT US</h1>
          <p>HOME / CONTACT</p>
        </div>
        <div className="choose">
          <img src={hero2} alt="Contact" width="500px" />
        </div>
      </section>

      {/* Contact Cards */}
      <section className="team opacity-0" ref={cardsRef}>
        <div className="meet_team">
          <h1>Contact Us</h1>
          <p>
            Service Apartment is ready to answer you anytime you call and deliver
            the assistance you need through our well-experienced customer service
            agents.
          </p>

          <div className="contact-cards">
            <div className="card">
              <i className="fa fa-map-marker"></i>
              <h5>Lagos, Nigeria</h5>
            </div>

            <div className="card">
              <i className="fa fa-envelope"></i>
              <h5>info@serviceapartment.africa</h5>
            </div>

            <div className="card">
              <i className="fa fa-phone"></i>
              <h5>+234 8143 727933</h5>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Contact Form */}
      <section className="mapp opacity-0" ref={mapRef}>
        <div className="map">
          <div id="map" style={{ height: "500px", width: "100%" }}></div>
        </div>

        <div className="contact_info opacity-0" ref={formRef}>
          <p>
            Send us a message today about whatever question that is bothering you,
            our customer service is active 100% to answer any question.
          </p>

          <div className="contact_input">
            <input type="text" placeholder="Your FirstName" />
            <input type="text" placeholder="Your LastName" />
            <br /> <br />
            <input type="email" placeholder="Enter email" />
            <br /> <br />
            <textarea cols="80" rows="10" placeholder="Your Message"></textarea>
            <br />
            <button className="ctn">
              <span className="send_mesg">Send a message</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

