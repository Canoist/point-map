import axios from "axios";
import configFile from "../config.json";
import authService from "./authService";
import localStorageService from "./localStorageService";

const http = axios.create({
    baseURL: configFile.apiEndPoint,
});

http.interceptors.request.use(
    async function (config) {
        const expiresDate: number = Number(
            localStorageService.getTokenExpiresDate()
        );
        const refreshToken = localStorageService.getRefreshToken();
        const isExpired = refreshToken && expiresDate < Date.now();

        if (isExpired) {
            const data = await authService.refresh();
            localStorageService.setTokens(data);
        }
        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }
        return config;
    },
    function (error) {
        console.log("err req");

        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    put: http.put,
    post: http.post,
    delete: http.delete,
    patch: http.patch,
};

export default httpService;
