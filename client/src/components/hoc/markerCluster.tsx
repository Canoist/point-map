import L from "leaflet";
import { createPathComponent } from "@react-leaflet/core";
import "leaflet.markercluster";

function createMarkerCluster({ children: _c, ...props }: any, context: any) {
    const clusterProps: any = {};
    const clusterEvents: any = {};
    // Splitting props and events to different objects
    Object.entries(props).forEach(([propName, prop]) =>
        propName.startsWith("on")
            ? (clusterEvents[propName] = prop)
            : (clusterProps[propName] = prop)
    );
    const instance = new L.MarkerClusterGroup(clusterProps);

    // Initializing event listeners
    Object.entries(clusterEvents).forEach(([eventAsProp, callback]: any) => {
        const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
        instance.on(clusterEvent, callback);
    });
    return {
        instance,
        context: {
            ...context,
            layerContainer: instance,
        },
    };
}

const MarkerCluster = createPathComponent(createMarkerCluster);

export default MarkerCluster;
