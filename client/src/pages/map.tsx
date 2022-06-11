import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import IPoint from "../types/IPoint";
import MapPopup from "../components/mapComponents/mapPopup";

interface MapProps {
    points?: any;
}

function MyComponent() {
    const map = useMapEvents({
        click: () => {
            map.locate();
        },
        locationfound: (location: any) => {
            console.log("location found:", location);
        },
    });
    return null;
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

const Map: React.FC<MapProps> = ({ points }) => {
    const [activeLoaction, setActiveLoaction] = useState<IPoint | null>(null);

    return (
        <MapContainer
            center={[60.1986, 30.3141]}
            zoom={8}
            scrollWheelZoom={true}>
            <MyComponent />
            <span>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {points &&
                    points.map((park: IPoint) => (
                        <Marker
                            key={park.properties._id}
                            position={[
                                park.geometry.coordinates[0],
                                park.geometry.coordinates[1],
                            ]}
                            eventHandlers={{
                                click: () => {
                                    setActiveLoaction(park);
                                },
                            }}
                        />
                    ))}
                {activeLoaction && (
                    <MapPopup
                        setActiveLoaction={setActiveLoaction}
                        activeLoaction={activeLoaction}
                    />
                )}
            </span>
        </MapContainer>
    );
};
export default Map;
