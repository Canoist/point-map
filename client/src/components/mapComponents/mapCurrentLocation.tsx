import { Button } from "@mui/material";
import React from "react";
import { useMap } from "react-leaflet";
import MapControl from "../hoc/mapControl";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const MapCurrentLocation: React.FC = () => {
    const map = useMap();

    return (
        <MapControl position="bottomright">
            <Button
                sx={{
                    px: 0,
                    minWidth: "36px",
                    mb: 3,
                }}
                variant="contained"
                onClick={() => {
                    map.locate({
                        setView: true,
                        enableHighAccuracy: true,
                    });
                }}>
                <GpsFixedIcon />
            </Button>
        </MapControl>
    );
};
export default MapCurrentLocation;
