import { IString } from "../services/authService";

export default interface IGeoCode {
    type: string;
    properties: {
        geocoding: {
            place_id: string;
            osm_type: string;
            osm_id: string;
            type: string;
            accuracy: number;
            label: string;
            name: string | null;
            housenumber: string;
            street: string;
            postcode: string;
            county: string;
            country: string;
            admin: IString;
        };
    };
    geometry: {
        type: string;
        coordinates: number[];
    };
}
