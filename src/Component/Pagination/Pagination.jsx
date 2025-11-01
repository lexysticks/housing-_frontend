import { useState, useEffect } from "react";
import axios from "axios";
import "./rent.css";

export default function RentPropertyGrid() {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/properties/?page=${currentPage}`)
      .then((res) => {
        setRentals(res.data.results || res.data); // Adjust depending on backend response
        if (res.data.count && res.data.results) {
          setTotalPages(Math.ceil(res.data.count / res.data.results.length));
        }
      })
      .catch((err) => console.error("Error fetching rental properties:", err));
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="property-grid">
        {rentals.length > 0 ? (
          rentals.map((rent) => (
            <div className="property-card" key={rent.id}>
              <div className="image-container">
                <img src={rent.images} alt={rent.title} />
                <span className="badge">{rent.category_type}</span>
              </div>

              <div className="property-details">
                <p className="price">₦ {Number(rent.price).toLocaleString()}</p>
                <p className="title">{rent.title}</p>
                <h5>📍 {rent.location}</h5>

                <ul className="feature">
                  <li>📐 {rent.size || "N/A"}</li>
                  <li>🛏️ {rent.bedrooms || 0} Bed</li>
                  <li>🛁 {rent.bathrooms || 0} Bath</li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No rental listings available.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <ul className="pagination-list">
          <li
            className={currentPage === 1 ? "disabled" : ""}
            onClick={() => handlePageChange(1)}
          >
            « First
          </li>
          <li
            className={currentPage === 1 ? "disabled" : ""}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ‹ Previous
          </li>

          <li className="current-page">
            Page {currentPage} of {totalPages}
          </li>

          <li
            className={currentPage === totalPages ? "disabled" : ""}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next ›
          </li>
          <li
            className={currentPage === totalPages ? "disabled" : ""}
            onClick={() => handlePageChange(totalPages)}
          >
            Last »
          </li>
        </ul>
      </div>
    </>
  );
}
