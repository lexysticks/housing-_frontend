// import "./Shortlet.css";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// // Custom hook for scroll fade animation
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

// export default function Shortlet() {
//   const [lands, setLands] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const headingRef = useRef(null);
//   const cardRefs = useRef([]);

//   // Scroll fade animation for heading and cards
//   useScrollFade(headingRef);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("show");
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
//   }, [lands]);

//   // Fetch lands from API
//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/shortlet/?page=${currentPage}`)
//       .then((res) => {
//         const data = res.data;

//         // Handle both paginated and simple list responses
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
//       .catch((err) => console.error("Error fetching lands:", err));
//   }, [currentPage]);

//   // Build image URL for Cloudinary
//   const getImageUrl = (land) => {
//     if (land.image_url) return land.image_url;
//     if (land.images && land.images.startsWith("http")) return land.images;
//     if (land.images) return `https://res.cloudinary.com/djil65xwt/${land.images}`;
//     return "/fallback.jpg";
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div className="rent">
//       {/* Heading */}
//       <div className="rent_one opacity-0" ref={headingRef}>
//         <h2>Properties For Shortlet</h2>
//         <p>
//           Find Your Perfect Haven! These exclusive land properties offer prime
//           locations, ideal for building your dream home or investing in the
//           future. Secure your piece of land today.
//         </p>
//       </div>

//       {/* Filter */}
//       <div className="property">
//         <ul className="property-list">
//           <li>
//             <a href="#" className="active">
//               Featured properties
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Property Cards */}
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
//                 <p className="price">₦ {Number(land.price).toLocaleString()}</p>
//                 <p className="title">{land.title}</p>
//                 <h5>📍 {land.location}</h5>
//                 <ul className="feature">
//                   <li>📐 {land.size || "N/A"}</li>
//                 </ul>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No shortlet listings available.</p>
//         )}
//       </div>

//       {/* Pagination */}
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
import "./Shortlet.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { endpoints } from "../../config";



// Custom hook for scroll fade animation
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

export default function Shortlet() {
  const [shortlets, setShortlets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  // Scroll fade animation for heading and cards
  useScrollFade(headingRef);

  useEffect(() => {
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
  }, [shortlets]);

  // ✅ Fetch shortlet data using the config endpoint
  useEffect(() => {
    axios
      .get(`${endpoints.shortlet}?page=${currentPage}`)
      .then((res) => {
        const data = res.data;

        // Handle both paginated and simple list responses
        if (Array.isArray(data)) {
          setShortlets(data);
          setTotalPages(1);
        } else if (Array.isArray(data.results)) {
          setShortlets(data.results);
          setTotalPages(Math.ceil(data.count / data.results.length));
        } else {
          console.error("Unexpected API response:", data);
          setShortlets([]);
        }
      })
      .catch((err) => console.error("Error fetching shortlet:", err));
  }, [currentPage]);

  // Build image URL for Cloudinary
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

  return (
    <div className="rent">
      {/* Heading */}
      <div className="rent_one opacity-0" ref={headingRef}>
        <h2>Properties For Shortlet</h2>
        <p>
          Discover beautifully furnished shortlet apartments for your stay.
          Whether for business or leisure, find your perfect home away from home.
        </p>
      </div>

      {/* Filter */}
      <div className="property">
        <ul className="property-list">
          <li>
            <a href="#" className="active">
              Featured Properties
            </a>
          </li>
        </ul>
      </div>

      {/* Property Cards */}
      <div className="property-grid">
        {Array.isArray(shortlets) && shortlets.length > 0 ? (
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
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
                <span className="badge">{item.category_type}</span>
              </div>
              <div className="property-details">
                <p className="price">₦ {Number(item.price).toLocaleString()}</p>
                <p className="title">{item.title}</p>
                <h5>📍 {item.location}</h5>
                <ul className="feature">
                  <li>📐 {item.size || "N/A"}</li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No shortlet listings available.</p>
        )}
      </div>

      {/* Pagination */}
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
