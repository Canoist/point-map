import React from "react";
import { Marker } from "react-leaflet";
import IPoint from "../../types/IPoint";

interface IMapMarker {
    setActiveLocation: any;
    point: IPoint;
}

const MapMarker: React.FC<IMapMarker> = ({ setActiveLocation, point }) => {
    return (
        <Marker
            position={[
                point.geometry.coordinates[0],
                point.geometry.coordinates[1],
            ]}
            eventHandlers={{
                click: () => {
                    setActiveLocation(point);
                },
            }}
        />
    );
};
export default MapMarker;
