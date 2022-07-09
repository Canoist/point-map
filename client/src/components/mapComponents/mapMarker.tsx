import React, { ReactNode } from "react";
import { Marker } from "react-leaflet";
import IPoint from "../../types/IPoint";

interface IMapMarker {
    setActiveLocation: any;
    point: IPoint;
    children: ReactNode;
}

const MapMarker: React.FC<IMapMarker> = ({
    setActiveLocation,
    point,
    children,
}) => {
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
            }}>
            {children}
        </Marker>
    );
};
export default MapMarker;
