import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// fix za marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
const CompanyMap = ({ companies }) => {
    if (companies.length === 0) return null;

    return (
        <div style={{ height: "400px", marginTop: "2rem" }}>
            <MapContainer
                center={[
                    companies[0].latitude,
                    companies[0].longitude
                ]}
                zoom={10}
                style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {companies.map((c) => (
                    <Marker
                        key={c.id}
                        position={[c.latitude, c.longitude]}
                    >
                        <Popup>
                            <b>{c.name}</b><br />
                            {c.address}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default CompanyMap;