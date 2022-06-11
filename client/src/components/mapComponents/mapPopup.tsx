import moment from "moment";
import React from "react";
import { Popup } from "react-leaflet";
import IPoint from "../../types/IPoint";

interface IMapPopup {
    activeLoaction: IPoint;
    setActiveLoaction: any;
}

const MapPopup: React.FC<IMapPopup> = ({
    activeLoaction,
    setActiveLoaction,
}) => {
    return (
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
                <p>
                    {moment(activeLoaction.properties.date).format(
                        "DD.MM.YY HH:mm"
                    )}
                </p>
                <h2>{activeLoaction.properties.name}</h2>
                <p>{activeLoaction.properties.description}</p>
            </div>
        </Popup>
    );
};
export default MapPopup;
