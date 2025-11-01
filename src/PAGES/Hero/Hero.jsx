import { useState, useEffect, useRef } from "react";
import "./Hero.css";
import WhyChooseUs from "./choose";
import AboutU from "./about";
import PropertySection from "../../Component/Product/product";
import ContactUs from "../../Component/Contact/contact";
import hero1 from "../../assets/service_1.jpg";
import hero2 from "../../assets/service_2.jpg";

export default function Hero() {
  const slides = [hero1, hero2];
  const [current, setCurrent] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false); // for header animation

  const chooseRef = useRef(null);
  const aboutRef = useRef(null);
  const propertyRef = useRef(null);
  const contactRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate hero on load
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animation for sections
  useEffect(() => {
    const sections = [
      chooseRef.current,
      aboutRef.current,
      propertyRef.current,
      contactRef.current,
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => section && observer.observe(section));

    return () => {
      sections.forEach((section) => section && observer.unobserve(section));
    };
  }, []);

  return (
    <>
      {/* ====== Hero Section ====== */}
      <header className={`header fade-section ${heroVisible ? "show" : ""}`}>
        <div className="header1">
          <div className="lrb">
            <ul>
              <li className="list">List.</li>
              <li className="rent">Rent.</li>
              <li className="list">Buy.</li>
            </ul>
          </div>
          <p>
            Making real estate simple and easy! Whether you’re listing your apartment
            for shortlet, booking a comfortable stay, or buying your dream property.
            Service Apartment Africa connects owners, renters, and buyers seamlessly.
          </p>
          <div className="lrb_pro_max">
            <button className="btn_book">Book an Apartment</button>
            <button className="btn_book">See Landed Properties</button>
          </div>
        </div>

        {/* ====== Image Slider ====== */}
        <div className="slider-container">
          <div className="slider" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((src, idx) => (
              <img key={idx} src={src} alt={`Slide ${idx + 1}`} />
            ))}
          </div>
          <button className="nav prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="nav next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </header>

      {/* ====== Scroll-Fade Sections ====== */}
      <div className="fade-section" ref={chooseRef}>
        <WhyChooseUs />
      </div>

      <div className="fade-section" ref={aboutRef}>
        <AboutU />
      </div>

      <div className="fade-section" ref={propertyRef}>
        <PropertySection />
      </div>

      <div className="fade-section" ref={contactRef}>
        <ContactUs />
      </div>
    </>
  );
}




