import "./Aboutus.css";
import hero2 from "../../assets/service_3.jpg";
import Property from "../../Component/Product/product";
import TeamSection from "../../Component/Team/Team";
import ContactUs from "../../Component/Contact/contact";
import { useEffect, useRef } from "react";

export default function Aboutus() {
  const chooseRef = useRef(null);
  const propertyRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll fade animation
  useEffect(() => {
    const sections = [
      chooseRef.current,
      propertyRef.current,
      teamRef.current,
      contactRef.current,
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // Animate once
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((sec) => sec && observer.observe(sec));

    return () => {
      sections.forEach((sec) => sec && observer.unobserve(sec));
    };
  }, []);

  return (
    <>
      {/* ====== About Section ====== */}
      <section className="why_choose_us fade-section" ref={chooseRef}>
        <div className="choose">
          <img src={hero2} alt="About Service Apartment Africa" width="500px" />
        </div>

        <div className="choose_pro">
          <h1>About Service Apartment</h1>
          <p>
            At Service Apartment Africa, we simplify property search, rentals, and
            real estate across Africa. Our platform connects guests with quality
            short-let apartments and helps buyers find verified properties for sale.
            Whether you’re renting for a few days or investing for the long term, we
            make the experience seamless and secure.
            <br />
            <br />
            We support property owners in listing apartments for rent or homes for
            sale, while guests and buyers enjoy a smooth, trusted process. Our
            mission is to create value for renters, landlords, and real estate
            investors through convenience, transparency, and top-tier service.
            <br />
            <br />
            We uphold the highest standards across every touchpoint—from listings to
            transactions. With Service Apartment Africa, you don’t just find a place
            to stay or invest—you discover opportunity.
          </p>
        </div>
      </section>

      {/* ====== Property Section ====== */}
      <div className="fade-section" ref={propertyRef}>
        <Property />
      </div>

      {/* ====== Team Section ====== */}
      <div className="fade-section" ref={teamRef}>
        <TeamSection />
      </div>

      {/* ====== Contact Section ====== */}
      <div className="fade-section" ref={contactRef}>
        <ContactUs />
      </div>
    </>
  );
}
