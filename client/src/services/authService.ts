import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorageService";

const httpAuth = axios.create({
    baseURL: configFile.apiEndPoint + "/auth/",
    params: { key: process.env.REACT_APP_FIREBASE_KEY },
});

export type IString = Record<string, string>;

const authService = {
    register: async (payload: string) => {
        const { data } = await httpAuth.post("signUp", payload);
        return data;
    },
    login: async ({ email, password }: IString) => {
        const { data } = await httpAuth.post("signInWithPassword", {
            email,
            password,
            returnSecureToken: true,
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken(),
        });
        return data;
    },
};

export default authService;
