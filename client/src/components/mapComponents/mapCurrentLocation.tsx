import React from "react";
import { useMap } from "react-leaflet";

const MapCurrentLocation: React.FC = () => {
    const map = useMap();
    console.log(map.locate());
    map.locate({
        setView: true,
        enableHighAccuracy: true,
    });
    return null;
};
export default MapCurrentLocation;
