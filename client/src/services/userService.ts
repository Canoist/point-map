import httpService from "./httpService";
import localStorageService from "./localStorageService";

const userEndPoint = "user";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },
    create: async (payload: any) => {
        const { data } = await httpService.put(
            userEndPoint + "/" + localStorageService.getUserId(),
            payload
        );
        return data;
    },
    patch: async (payload: any) => {
        const { data } = await httpService.patch(
            userEndPoint + "/" + localStorageService.getUserId(),
            payload
        );
        return data;
    },
    delete: async () => {
        const { data } = await httpService.delete(
            userEndPoint + "/" + localStorageService.getUserId()
        );
        return data;
    },
};

export default userService;
