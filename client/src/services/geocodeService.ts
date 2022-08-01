import { LatLngTuple } from "leaflet";
import mainGeoService from "./mainGeoService";

const geocodeService = {
    get: async (latLon: LatLngTuple) => {
        const { data } = await mainGeoService.get(
            `reverse?format=geocodejson&lat=${latLon[0]}&lon=${latLon[1]}`
        );
        return data.features[0];
    },
};

export default geocodeService;
