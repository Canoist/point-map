import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import IPoint from "../types/IPoint";
import MapPopup from "../components/mapComponents/mapPopup";
import MapMarker from "../components/mapComponents/mapMarker";
import MapLayer from "../components/mapComponents/mapLayer";
import { getPoints } from "../store/points";
import { useAppSelector } from "../store/hooks";
import MapCurrentLocation from "../components/mapComponents/mapCurrentLocation";

interface MapProps {
    points?: any;
}

// function MyComponent() {
//     const [position, setPosition] = useState<any>(null);
//     const map = useMapEvents({
//         click() {
//             map.locate();
//         },
//         locationfound(e:any) {
//             setPosition(e.latlng);
//             map.flyTo(e.latlng, map.getZoom());
//         },
//     });

const Map: React.FC<MapProps> = () => {
    const [activeLocation, setActiveLocation] = useState<IPoint | null>(null);

    const handleChangeLocation = (location: IPoint | null) => {
        setActiveLocation(location);
    };

    const points = useAppSelector(getPoints());

    return (
        <MapContainer
            center={[60.1986, 30.3141]}
            zoom={8}
            scrollWheelZoom={true}>
            <MapCurrentLocation />
            <MapLayer />
            {points &&
                points.map((point: IPoint) => (
                    <MapMarker
                        key={point.properties._id}
                        point={point}
                        setActiveLocation={handleChangeLocation}>
                        {activeLocation && (
                            <MapPopup
                                setActiveLocation={handleChangeLocation}
                                activeLocation={activeLocation}
                            />
                        )}
                    </MapMarker>
                ))}
        </MapContainer>
    );
};
export default Map;
