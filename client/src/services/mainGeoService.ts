import axios from "axios";
import configFile from "../config.json";

const http = axios.create({
    baseURL: configFile.geocodeEndPoint,
});

const mainGeoService = {
    get: http.get,
};

export default mainGeoService;
