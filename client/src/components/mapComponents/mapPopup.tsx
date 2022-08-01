import React from "react";
import { Popup } from "react-leaflet";
import IPoint from "../../types/IPoint";
import MapCard from "./mapCard";

interface IMapPopup {
    activeLocation: IPoint;
    setActiveLocation: any;
}

const MapPopup: React.FC<IMapPopup> = ({
    activeLocation,
    setActiveLocation,
}) => {
    return (
        <Popup
            position={[
                activeLocation.geometry.coordinates[0],
                activeLocation.geometry.coordinates[1],
            ]}
            eventHandlers={{
                click: () => {
                    setActiveLocation(null);
                },
            }}>
            <MapCard properties={activeLocation.properties} />
        </Popup>
    );
};
export default MapPopup;
