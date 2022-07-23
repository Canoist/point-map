import React from "react";
import { useMapEvents } from "react-leaflet";

interface IMapEvents {
    setTemplate: any;
}

const MapEvents: React.FC<IMapEvents> = ({ setTemplate }) => {
    useMapEvents({
        contextmenu(e) {
            const { lat, lng } = e.latlng;
            setTemplate([lat, lng]);
        }
    });
    return null;
};
export default MapEvents;
