import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { endpoints } from "../../config";

/* =======================
   Skeleton Loader
======================= */
const SkeletonCards = () =>
  Array.from({ length: 6 }).map((_, i) => (
    <div className="property-card skeleton-card" key={i}>
      <div className="image-container skeleton"></div>
      <div className="property-details">
        <div className="skeleton skeleton-text short"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text small"></div>
      </div>
    </div>
  ));

/* =======================
   Scroll Fade Hook
======================= */
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

/* =======================
   Shortlet Component
======================= */
export default function Shortlet() {
  const [shortlets, setShortlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  /* Fade heading */
  useScrollFade(headingRef);

  /* Fade cards ONLY when real data exists */
  useEffect(() => {
    if (loading || shortlets.length === 0 || error) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => {
      cardRefs.current.forEach((card) => card && observer.unobserve(card));
    };
  }, [shortlets, loading, error]);

  /* =======================
     Fetch Data
  ======================= */
  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`${endpoints.rent}?page=${currentPage}`)
      .then((res) => {
        const data = res.data;

        if (Array.isArray(data)) {
          setShortlets(data);
          setTotalPages(1);
        } else if (Array.isArray(data.results)) {
          setShortlets(data.results);
          setTotalPages(Math.ceil(data.count / data.results.length));
        } else {
          setShortlets([]);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching shortlet:", err);
        setError(true);
        setShortlets([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  /* =======================
     Image Helper
  ======================= */
  const getImageUrl = (item) => {
    if (item.image_url) return item.image_url;
    if (item.images && item.images.startsWith("http")) return item.images;
    if (item.images)
      return `https://res.cloudinary.com/djil65xwt/${item.images}`;
    return "/fallback.jpg";
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  /* =======================
     JSX
  ======================= */
  return (
    <div className="rent">
      {/* ===== Header ===== */}
      <div className="rent_one opacity-0" ref={headingRef}>
        <h2>Properties For Lease</h2>
        <p>
          Discover your next rental home with ease. Browse modern, affordable
          properties in great locations.
        </p>
      </div>

      {/* ===== Filter ===== */}
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
        {loading || shortlets.length === 0 || error ? (
          <SkeletonCards />
        ) : (
          shortlets.map((item, index) => (
            <div
              className="property-card opacity-0"
              key={item.id || index}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <div className="image-container">
                <img
                  src={getImageUrl(item)}
                  alt={item.title}
                  loading="lazy"
                  onLoad={(e) => e.target.classList.add("loaded")}
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                    e.target.classList.add("loaded");
                  }}
                />
                <div className="image-placeholder"></div>
                <span className="badge">{item.category_type}</span>
              </div>

              <div className="property-details">
                <p className="price">
                  ₦ {Number(item.price).toLocaleString()}
                </p>
                <p className="title">{item.title}</p>
                <h5>📍 {item.location}</h5>
                <ul className="feature">
                  <li>📐 {item.size || "N/A"}</li>
                </ul>
              </div>
            </div>
          ))
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







// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import './Rent.css'; // ✅ renamed CSS file
// import { endpoints } from "../../config";

// // Custom hook for scroll fade animation
// function useScrollFade(ref) {
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("lease-show");
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

// export default function Lease() {
//   const [units, setUnits] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const headingRef = useRef(null);
//   const cardRefs = useRef([]);

//   useScrollFade(headingRef);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("lease-show");
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     cardRefs.current.forEach((card) => card && observer.observe(card));
//     return () => {
//       cardRefs.current.forEach((card) => card && observer.unobserve(card));
//     };
//   }, [units]);

//   // Fetch properties for lease
//   useEffect(() => {
//     axios
//       .get(`${endpoints.rent}?page=${currentPage}`)
//       .then((res) => {
//         const data = res.data;
//         if (Array.isArray(data)) {
//           setUnits(data);
//           setTotalPages(1);
//         } else if (Array.isArray(data.results)) {
//           setUnits(data.results);
//           setTotalPages(Math.ceil(data.count / data.results.length));
//         } else {
//           console.error("Unexpected API response:", data);
//           setUnits([]);
//         }
//       })
//       .catch((err) => console.error("Error fetching lease listings:", err));
//   }, [currentPage]);

//   const getImageUrl = (unit) => {
//     if (unit.image_url) return unit.image_url;
//     if (unit.images && unit.images.startsWith("http")) return unit.images;
//     if (unit.images) return `https://res.cloudinary.com/djil65xwt/${unit.images}`;
//     return "/fallback.jpg";
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div className="lease-container">
//       {/* Heading */}
//       <div className="lease-header opacity-0" ref={headingRef}>
//         <h2>Properties For Lease</h2>
//         <p>
//           Discover your next rental home with ease. Browse modern, affordable properties in great locations.
//         </p>
//       </div>

//       {/* Filter */}
//       <div className="lease-filter">
//         <ul className="lease-filter-list">
//           <li>
//             <a href="#" className="lease-active">
//               Featured Listings
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Property Grid */}
//       <div className="lease-grid">
//         {Array.isArray(units) && units.length > 0 ? (
//           units.map((unit, index) => (
//             <div
//               className="lease-card opacity-0"
//               key={unit.id || index}
//               ref={(el) => (cardRefs.current[index] = el)}
//             >
//               <div className="lease-image-box">
//                 <div className="lease-placeholder"></div>
//                 <img
//                   src={getImageUrl(unit)}
//                   alt={unit.title}
//                   loading="lazy"
//                   onLoad={(e) => e.target.classList.add("lease-loaded")}
//                   onError={(e) => (e.target.src = "/fallback.jpg")}
//                 />
//                 <span className="lease-badge">{unit.category_type}</span>
//               </div>

//               <div className="lease-info">
//                 <p className="lease-price">₦ {Number(unit.price).toLocaleString()}</p>
//                 <p className="lease-title">{unit.title}</p>
//                 <h5>📍 {unit.location}</h5>
//                 <ul className="lease-features">
//                   <li>📐 {unit.size || "N/A"}</li>
//                   <li>🛏️ {unit.bedrooms || 0} Bed</li>
//                   <li>🛁 {unit.bathrooms || 0} Bath</li>
//                 </ul>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No lease listings available.</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="lease-pagination">
//         <ul className="lease-page-list">
//           <li
//             className={currentPage === 1 ? "lease-disabled" : ""}
//             onClick={() => handlePageChange(1)}
//           >
//             « First
//           </li>
//           <li
//             className={currentPage === 1 ? "lease-disabled" : ""}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             ‹ Prev
//           </li>
//           <li className="lease-current">
//             Page {currentPage} of {totalPages}
//           </li>
//           <li
//             className={currentPage === totalPages ? "lease-disabled" : ""}
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             Next ›
//           </li>
//           <li
//             className={currentPage === totalPages ? "lease-disabled" : ""}
//             onClick={() => handlePageChange(totalPages)}
//           >
//             Last »
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

