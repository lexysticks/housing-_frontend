// import "./Land.css";
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

// export default function Land() {
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
//       .get(`http://127.0.0.1:8000/Lands/?page=${currentPage}`)
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
//         <h2>Properties For Land</h2>
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
//               Featured Properties
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
//           <p>No land listings available.</p>
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
import "./Land.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { endpoints } from "../../config"; // ✅ import your config file

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

export default function Land() {
  const [lands, setLands] = useState([]);
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
  }, [lands]);

  // ✅ Fetch lands from API using your config endpoint
  useEffect(() => {
    axios
      .get(`${endpoints.lands}?page=${currentPage}`)
      .then((res) => {
        const data = res.data;

        // Handle both paginated and simple list responses
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
      .catch((err) => console.error("Error fetching lands:", err));
  }, [currentPage]);

  // Build image URL for Cloudinary
  const getImageUrl = (land) => {
    if (land.image_url) return land.image_url;
    if (land.images && land.images.startsWith("http")) return land.images;
    if (land.images) return `https://res.cloudinary.com/djil65xwt/${land.images}`;
    return "/fallback.jpg";
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="rent">
      {/* Heading */}
      <div className="rent_one opacity-0" ref={headingRef}>
        <h2>Properties For Land</h2>
        <p>
          Find Your Perfect Haven! These exclusive land properties offer prime
          locations, ideal for building your dream home or investing in the
          future. Secure your piece of land today.
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
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No land listings available.</p>
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




