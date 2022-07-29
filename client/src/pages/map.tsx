import React, { useState } from "react";
import { MapContainer, Marker } from "react-leaflet";
import IPoint from "../types/IPoint";
import MapPopup from "../components/mapComponents/mapPopup";
import MapMarker from "../components/mapComponents/mapMarker";
import MapLayer from "../components/mapComponents/mapLayer";
import { getPoints } from "../store/points";
import { useAppSelector } from "../store/hooks";
import MapCurrentLocation from "../components/mapComponents/mapCurrentLocation";
import MarkerCluster from "../components/hoc/markerCluster";
import MapEvents from "../components/mapComponents/mapEvents";
import { LatLngTuple } from "leaflet";
import AddPointWindow from "../components/point/addPointWindow";
import geocodeService from "../services/geocodeService";

interface MapProps {
    points?: any;
}

const Map: React.FC<MapProps> = () => {
    const [activeLocation, setActiveLocation] = useState<IPoint | null>(null);
    const [tempMarker, setTempMarker] = useState<LatLngTuple | null>(null);
    const [openCreator, setOpenCreator] = useState<Boolean>(false);

    const handleChangeLocation = (location: IPoint | null) => {
        setActiveLocation(location);
    };

    const handleChangeTempMarker = (latlng: LatLngTuple) => {
        setTempMarker((prev) => (prev ? null : latlng));
    };

    const handleCloseCreator = () => {
        setOpenCreator(false);
    };

    const points = useAppSelector(getPoints());

    return (
        <>
            <MapContainer
                center={[60.1986, 30.3141]}
                zoom={8}
                scrollWheelZoom={true}
            >
                <MapCurrentLocation />
                <MapLayer />
                <MarkerCluster>
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
                    {tempMarker && (
                        <Marker
                            position={tempMarker}
                            draggable={true}
                            eventHandlers={{
                                click: async () => {
                                    setOpenCreator(true);
                                    const data = await geocodeService.get(
                                        tempMarker
                                    );
                                    console.log(data);
                                },
                            }}
                        />
                    )}
                </MarkerCluster>
                <MapEvents setTemplate={handleChangeTempMarker} />
            </MapContainer>
            {openCreator && (
                <AddPointWindow
                    open={true}
                    onClose={handleCloseCreator}
                    latLng={tempMarker!}
                />
            )}
        </>
    );
};
export default Map;
