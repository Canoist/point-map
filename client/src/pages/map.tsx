import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import IPoint from "../types/IPoint";
import MapPopup from "../components/mapComponents/mapPopup";
import MapMarker from "../components/mapComponents/mapMarker";
import MapLayer from "../components/mapComponents/mapLayer";

interface MapProps {
    points?: any;
}

// function MyComponent() {
//     const map = useMapEvents({
//         click: () => {
//             map.locate();
//         },
//         locationfound: (location: any) => {
//             console.log("location found:", location);
//         },
//     });
//     return null;
// }

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

const Map: React.FC<MapProps> = ({ points }) => {
    const [activeLoaction, setActiveLoaction] = useState<IPoint | null>(null);

    return (
        <MapContainer
            center={[60.1986, 30.3141]}
            zoom={8}
            scrollWheelZoom={true}>
            <MapLayer />
            {points &&
                points.map((point: IPoint) => (
                    <MapMarker
                        key={point.properties._id}
                        point={point}
                        setActiveLoaction={setActiveLoaction}
                    />
                ))}
            {activeLoaction && (
                <MapPopup
                    setActiveLoaction={setActiveLoaction}
                    activeLoaction={activeLoaction}
                />
            )}
        </MapContainer>
    );
};
export default Map;
