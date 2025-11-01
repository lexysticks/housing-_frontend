// import "./buy.css";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";


// // Custom hook for scroll fade animation
// function useScrollFade(ref) {
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("show");
//           observer.unobserve(entry.target);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (ref.current) observer.observe(ref.current);
//     return () => {
//       if (ref.current) observer.unobserve(ref.current);
//     };
//   }, [ref]);
// }

// export default function Buy() {
//   const [lands, setLands] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const headingRef = useRef(null);
//   const cardRefs = useRef([]);

//   // Scroll animation for heading
//   useScrollFade(headingRef);

//   // Scroll animation for cards
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) =>
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("show");
//             observer.unobserve(entry.target);
//           }
//         }),
//       { threshold: 0.1 }
//     );

//     cardRefs.current.forEach((card) => card && observer.observe(card));

//     return () => {
//       cardRefs.current.forEach((card) => card && observer.unobserve(card));
//     };
//   }, [lands]);

//   // Fetch data
//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/buy/?page=${currentPage}`)
//       .then((res) => {
//         const data = res.data;
//         if (Array.isArray(data)) {
//           setLands(data);
//           setTotalPages(1);
//         } else if (Array.isArray(data.results)) {
//           setLands(data.results);
//           setTotalPages(Math.ceil(data.count / data.results.length));
//         } else {
//           console.error("Unexpected API response:", data);
//           setLands([]);
//         }
//       })
//       .catch((err) => console.error("❌ Error fetching data:", err));
//   }, [currentPage]);

//   // Build image URL for Cloudinary
//   const getImageUrl = (land) => {
//     if (land.image_url) return land.image_url;
//     if (land.images && land.images.startsWith("http")) return land.images;
//     if (land.images)
//       return `https://res.cloudinary.com/djil65xwt/${land.images}`;
//     return "/fallback.jpg";
//   };

//   // Pagination
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div className="rent">
//       {/* ===== Heading ===== */}
//       <div className="rent_one opacity-0" ref={headingRef}>
//         <h2>Properties For Sale</h2>
//         <p>
//           Find Your Perfect Haven! These exclusive properties offer prime
//           locations and modern architecture — perfect for your next investment.
//         </p>
//       </div>

//       {/* ===== Filter Section ===== */}
//       <div className="property">
//         <ul className="property-list">
//           <li>
//             <a href="#" className="active">
//               Featured Properties
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* ===== Property Grid ===== */}
//       <div className="property-grid">
//         {Array.isArray(lands) && lands.length > 0 ? (
//           lands.map((land, index) => (
//             <div
//               className="property-card opacity-0"
//               key={land.id || index}
//               ref={(el) => (cardRefs.current[index] = el)}
//             >
//               <div className="image-container">
//                 <img
//                   src={getImageUrl(land)}
//                   alt={land.title}
//                   onError={(e) => (e.target.src = "/fallback.jpg")}
//                 />
//                 <span className="badge">{land.category_type}</span>
//               </div>
//               <div className="property-details">
//                 <p className="price">
//                   ₦ {Number(land.price).toLocaleString()}
//                 </p>
//                 <p className="title">{land.title}</p>
//                 <h5>📍 {land.location}</h5>
//                 <ul className="feature">
//                   <li>📐 {land.size || "N/A"}</li>
//                   <li>🛏️ {land.bedrooms || 0} Bed</li>
//                   <li>🛁 {land.bathrooms || 0} Bath</li>
//                 </ul>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No house listings available.</p>
//         )}
//       </div>

//       {/* ===== Pagination ===== */}
//       <div className="pagination">
//         <ul className="pagination-list">
//           <li
//             className={currentPage === 1 ? "disabled" : ""}
//             onClick={() => handlePageChange(1)}
//           >
//             « First
//           </li>
//           <li
//             className={currentPage === 1 ? "disabled" : ""}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             ‹ Previous
//           </li>

//           <li className="current-page">
//             Page {currentPage} of {totalPages}
//           </li>

//           <li
//             className={currentPage === totalPages ? "disabled" : ""}
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             Next ›
//           </li>
//           <li
//             className={currentPage === totalPages ? "disabled" : ""}
//             onClick={() => handlePageChange(totalPages)}
//           >
//             Last »
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
import "./buy.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { endpoints } from "../../config";


// ✅ Custom hook for scroll fade animation
function useScrollFade(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
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

export default function Buy() {
  const [lands, setLands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  // ✅ Apply scroll fade to heading
  useScrollFade(headingRef);

  // ✅ Scroll fade for each property card
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

  // ✅ Fetch data from Django API (auto-switch between local and Render)
  useEffect(() => {
    axios
      .get(`${endpoints.buy}?page=${currentPage}`)
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

  // ✅ Helper to handle image URLs (Cloudinary / fallback)
  const getImageUrl = (land) => {
    if (land.image_url) return land.image_url;
    if (land.images && land.images.startsWith("http")) return land.images;
    if (land.images) return `https://res.cloudinary.com/djil65xwt/${land.images}`;
    return "/fallback.jpg";
  };

  // ✅ Handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="rent">
      {/* ===== Heading ===== */}
      <div className="rent_one opacity-0" ref={headingRef}>
        <h2>Properties For Sale</h2>
        <p>
          Find Your Perfect Haven! These exclusive properties offer prime
          locations and modern architecture — perfect for your next investment.
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
              <div className="image-container">
                <img
                  src={getImageUrl(land)}
                  alt={land.title}
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
                <span className="badge">{land.category_type}</span>
              </div>
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

      {/* ===== Pagination ===== */}
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
    </div>
  );
}
