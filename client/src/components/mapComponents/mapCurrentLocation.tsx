import React from "react";
import { useMapEvents } from "react-leaflet";

const MapCurrentLocation: React.FC = () => {
    const map = useMapEvents({
        click: () => {
            map.locate();
        },
        locationfound: (location: any) => {
            console.log("location found:", location);
        },
    });
    return null;
};
export default MapCurrentLocation;
