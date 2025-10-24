import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";

export default function ProtectedHome() {
  return (
    <div className="page-home">
      <Navbar />

      <div className="map-card">
        <div className="map-wrapper">
          <MapContainer
            center={[49.8397, 24.0297]}
            zoom={13}
            scrollWheelZoom={false}
            className="map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[49.8397, 24.0297]}>
              <Popup>
                <strong>Lviv</strong>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
