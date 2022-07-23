import React from "react";
import { useMapEvents } from "react-leaflet";
import L from "leaflet";

const MapEvents: React.FC = () => {
    const map = useMapEvents({
        contextmenu(e) {
            const { lat, lng } = e.latlng;
            L.marker([lat, lng]).addTo(map);
        }
    });
    return null;
};
export default MapEvents;
