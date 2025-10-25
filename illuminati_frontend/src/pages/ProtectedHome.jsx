import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import { getAllRecords } from "../api";

export default function ProtectedHome() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      try {
        const res = await getAllRecords();
        if (res.status === "OK") {
          setRecords(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch records:", err);
      }
    }
    loadRecords();
  }, []);

  return (
    <div className="page-home">
      <Navbar />

      <div className="map-card">
        <div className="map-wrapper">
          <MapContainer
            center={[49.8397, 24.0297]}
            zoom={13}
            scrollWheelZoom={true}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {records.map((r) => (
              <Marker key={r.id} position={[r.x, r.y]}>
                <Popup>
                  <strong>{r.type || "Unknown"}</strong>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
