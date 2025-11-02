import "./product.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { endpoints } from "../../config"; // ✅ Import the centralized API config

// ===== Custom Hook for Scroll Fade Animation =====
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

// ===== Main Component =====
export default function Property() {
  const [lands, setLands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  // Scroll animation for heading
  useScrollFade(headingRef);

  // Scroll animation for cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));

    return () => {
      cardRefs.current.forEach((card) => card && observer.unobserve(card));
    };
  }, [lands]);

  // ✅ Fetch data dynamically from config.js endpoint
  useEffect(() => {
    axios
      .get(`${endpoints.properties}?page=${currentPage}`)
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setLands(data);
          setTotalPages(1);
        } else if (Array.isArray(data.results)) {
          setLands(data.results);
          setTotalPages(Math.ceil(data.count / data.results.length));
        } else {
          console.error("Unexpected API response:", data);
          setLands([]);
        }
      })
      .catch((err) => console.error("❌ Error fetching data:", err));
  }, [currentPage]);

  // ===== Build Image URL for Cloudinary =====
  const getImageUrl = (land) => {
    if (land.image_url) return land.image_url;
    if (land.images && land.images.startsWith("http")) return land.images;
    if (land.images)
      return `https://res.cloudinary.com/djil65xwt/${land.images}`;
    return "/fallback.jpg";
  };

  // ===== Pagination =====
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="rent">
      {/* ===== Page Header ===== */}
      <div className="rent_one opacity-0" ref={headingRef}>
        <h2>Explore Our Properties</h2>
        <p>
          Discover stunning apartments and homes tailored to your needs. 
          Browse through featured listings and find your dream space today.
        </p>
      </div>

      {/* ===== Filter Section ===== */}
      <div className="property">
        <ul className="property-list">
          <li>
            <a href="#" className="active">
              Featured Properties
            </a>
          </li>
        </ul>
      </div>

      {/* ===== Property Grid ===== */}
      <div className="property-grid">
        {Array.isArray(lands) && lands.length > 0 ? (
          lands.map((land, index) => (
            <div
              className="property-card opacity-0"
              key={land.id || index}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              {/* ✅ Lazy loading with shimmer placeholder */}
              <div className="image-container">
                <img
                  src={getImageUrl(land)}
                  alt={land.title}
                  loading="lazy"
                  onLoad={(e) => e.target.classList.add("loaded")}
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                    e.target.classList.add("loaded");
                  }}
                />
                <div className="image-placeholder"></div>
                <span className="badge">{land.category_type}</span>
              </div>

              {/* ===== Property Details ===== */}
              <div className="property-details">
                <p className="price">₦ {Number(land.price).toLocaleString()}</p>
                <p className="title">{land.title}</p>
                <h5>📍 {land.location}</h5>
                <ul className="feature">
                  <li>📐 {land.size || "N/A"}</li>
                  <li>🛏️ {land.bedrooms || 0} Bed</li>
                  <li>🛁 {land.bathrooms || 0} Bath</li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No house listings available.</p>
        )}
      </div>

      {/* ===== Click To See More Buttons ===== */}
      <div className="click_to">
        <button className="btn_book">
          <a href="#">Click To See More Apartments</a>
        </button>
        <button className="btn_book">
          <a href="#">Click To See More Landed Properties</a>
        </button>
      </div>
    </div>
  );
}


