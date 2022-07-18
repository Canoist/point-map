import L from "leaflet";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IControl {
    position: L.ControlPosition;
    children?: React.ReactNode;
    prepend?: boolean;
}

const POSITION_CLASSES = {
    bottomleft: "leaflet-bottom leaflet-left",
    bottomright: "leaflet-bottom leaflet-right",
    topleft: "leaflet-top leaflet-left",
    topright: "leaflet-top leaflet-right",
};

const MapControl: React.FC<IControl> = ({
    position,
    children,
    prepend,
}) => {
    const [portalRoot, setPortalRoot] = useState<any>(
        document.createElement("div")
    );
    const positionClass =
        (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
    const portalContainer = document.createElement("div");

    useEffect(() => {
        const targetDiv = document.getElementsByClassName(positionClass);
        setPortalRoot(targetDiv[0]);
    }, [positionClass]);

    if (prepend !== undefined && prepend === true) {
        portalRoot.prepend(portalContainer);
    } else {
        portalRoot.append(portalContainer);
    }

    const controlContainer = (
        <div className={positionClass}>
            <div className="leaflet-control ">{children}</div>
        </div>
    );

    L.DomEvent.disableClickPropagation(portalRoot);

    return ReactDOM.createPortal(controlContainer, portalContainer);
};

export default MapControl;
