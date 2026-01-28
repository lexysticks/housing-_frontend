import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { endpoints } from "../../config";
import "./product.css";

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

  // Fade heading
  useScrollFade(headingRef);

  // Fade cards after data loads
  useEffect(() => {
    if (loading || error || shortlets.length === 0) return;

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

  // Fetch shortlet data
  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`${endpoints.properties}?page=${currentPage}`)
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data.results)) {
          setShortlets(data.results);
          setTotalPages(Math.ceil(data.count / data.results.length));
        } else if (Array.isArray(data)) {
          setShortlets(data);
          setTotalPages(1);
        } else {
          setShortlets([]);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching shortlets:", err);
        setError(true);
        setShortlets([]);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  // Helper to get image
  const getImageUrl = (item) => {
    if (item.image_url) return item.image_url;
    if (item.images?.startsWith("http")) return item.images;
    if (item.images)
      return `https://res.cloudinary.com/djil65xwt/${item.images}`;
    return "/fallback.jpg";
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="rent">
      {/* ===== Heading ===== */}
      <div className="rent_one opacity-0" ref={headingRef}>
        <h2>Explore Our Properties</h2>
         <p>
           Discover stunning apartments and homes tailored to your needs.
           Browse through featured listings and find your dream space today.
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
        {loading || error ? (
          <SkeletonCards />
        ) : shortlets.length === 0 ? (
          <p className="empty-text">No shortlets available.</p>
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

      {/* ===== CTA Buttons ===== */}
      <div className="click_to">
        <button className="btn_book">
          <a href="#">Click To See More Apartments</a>
        </button>
        <button className="btn_book">
          <a href="#">Click To See More Landed Properties</a>
        </button>
      </div>

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
}



// import "./product.css";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { endpoints } from "../../config";

// // ===== Custom Hook for Scroll Fade Animation =====
// function useScrollFade(ref) {
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("show");
//           observer.unobserve(entry.target); // animate once
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

// export default function Property() {
//   const [lands, setLands] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false); // ⚡ new state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const headingRef = useRef(null);
//   const cardRefs = useRef([]);

//   useScrollFade(headingRef);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${endpoints.shortlet}?page=${currentPage}`)
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
//       .catch((err) => {
//         console.error("❌ Error fetching data:", err);
//         setError(true); // ⚡ mark error
//         setLands([]);
//       })
//       .finally(() => setLoading(false));
//   }, [currentPage]);

//   const getImageUrl = (land) => {
//     if (land.image_url) return land.image_url;
//     if (land.images && land.images.startsWith("http")) return land.images;
//     if (land.images)
//       return `https://res.cloudinary.com/djil65xwt/${land.images}`;
//     return "/fallback.jpg";
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   // ⚡ Reusable skeleton component
//   const SkeletonCards = () =>
//     Array.from({ length: 6 }).map((_, i) => (
//       <div className="property-card skeleton-card" key={i}>
//         <div className="image-container skeleton"></div>
//         <div className="property-details">
//           <div className="skeleton skeleton-text short"></div>
//           <div className="skeleton skeleton-text"></div>
//           <div className="skeleton skeleton-text small"></div>
//         </div>
//       </div>
//     ));

//   return (
//     <div className="rent">
//       {/* ===== Page Header ===== */}
//       <div className="rent_one opacity-0" ref={headingRef}>
//         <h2>Explore Our Properties</h2>
//         <p>
//           Discover stunning apartments and homes tailored to your needs.
//           Browse through featured listings and find your dream space today.
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
//         {loading || lands.length === 0 || error ? ( // ⚡ condition updated
//           <SkeletonCards />
//         ) : (
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
//                   loading="lazy"
//                   onLoad={(e) => e.target.classList.add("loaded")}
//                   onError={(e) => {
//                     e.target.src = "/fallback.jpg";
//                     e.target.classList.add("loaded");
//                   }}
//                 />
//                 <div className="image-placeholder"></div>
//                 <span className="badge">{land.category_type}</span>
//               </div>
//               <div className="property-details">
//                 <p className="price">₦ {Number(land.price).toLocaleString()}</p>
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
//         )}
//       </div>

//       {/* ===== Click To See More Buttons ===== */}
//       <div className="click_to">
//         <button className="btn_book">
//           <a href="#">Click To See More Apartments</a>
//         </button>
//         <button className="btn_book">
//           <a href="#">Click To See More Landed Properties</a>
//         </button>
//       </div>
//     </div>
//   );
// }



