import React from "react";
import { Marker } from "react-leaflet";
import IPoint from "../../types/IPoint";

interface IMapMarker {
    setActiveLoaction: any;
    point: IPoint;
}

const MapMarker: React.FC<IMapMarker> = ({ setActiveLoaction, point }) => {
    return (
        <Marker
            position={[
                point.geometry.coordinates[0],
                point.geometry.coordinates[1],
            ]}
            eventHandlers={{
                click: () => {
                    setActiveLoaction(point);
                },
            }}
        />
    );
};
export default MapMarker;
