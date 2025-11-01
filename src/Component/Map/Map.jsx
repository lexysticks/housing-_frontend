import { useEffect } from "react";
import L from "leaflet";
import "./Map.css";

export default function Map({ lat = 6.5244, lng = 3.3792, zoom = 13 }) {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    // Only initialize if not already initialized
    if (!mapContainer._leaflet_id) {
      const map = L.map("map").setView([lat, lng], zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup("Hello from Lagos!")
        .openPopup();

      // Cleanup
      return () => map.remove();
    }
  }, [lat, lng, zoom]);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}

