import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { getPoints } from "../../store/points";
import IPoint from "../../types/IPoint";
import MapMarker from "./mapMarker";
import MapPopup from "./mapPopup";

const MapMarkersForCluster: React.FC = () => {
    const [activeLocation, setActiveLocation] = useState<IPoint | null>(null);

    const handleChangeLocation = (location: IPoint | null) => {
        setActiveLocation(location);
    };

    const points = useAppSelector(getPoints());
    return (
        <>
            {points &&
                points.map((point: IPoint) => (
                    <MapMarker
                        key={point.properties._id}
                        point={point}
                        setActiveLocation={handleChangeLocation}
                    >
                        {activeLocation && (
                            <MapPopup
                                setActiveLocation={handleChangeLocation}
                                activeLocation={activeLocation}
                            />
                        )}
                    </MapMarker>
                ))}
        </>
    );
};
export default MapMarkersForCluster;
