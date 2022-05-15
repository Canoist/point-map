import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapProps {
  points: any;
}

const Map: React.FC<MapProps> = (props: MapProps) => {
  const { points } = props;
  const [activeLoaction, setActiveLoaction] = useState<any | null>(null);

  return (
    <MapContainer center={[60.1986, 30.3141]} zoom={8} scrollWheelZoom={true}>
      <span>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points &&
          points.map(
            (park: {
              properties: { ID: string };
              geometry: { coordinates: number[] };
            }) => (
              <Marker
                key={park.properties.ID}
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
            )
          )}
        {activeLoaction && (
          <Popup
            position={[
              activeLoaction.geometry.coordinates[0],
              activeLoaction.geometry.coordinates[1],
            ]}
            eventHandlers={{
              click: () => {
                setActiveLoaction(null);
              },
            }}>
            <div>
              <h2>{activeLoaction.properties.NAME}</h2>
              <p>{activeLoaction.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        )}
      </span>
    </MapContainer>
  );
};
export default Map;
