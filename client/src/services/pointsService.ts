import IPoint from "../types/IPoint";
import httpService from "./httpService";

const pointsEndPoint = "points/";

const pointsService = {
    get: async () => {
        const { data } = await httpService.get(pointsEndPoint);
        return data;
    },
    createPoint: async (payload: IPoint) => {
        const { data } = await httpService.put(
            pointsEndPoint + payload.properties._id,
            payload
        );
        return data;
    },
    patch: async (payload: IPoint[]) => {
        const { data } = await httpService.patch(pointsEndPoint, payload);
        return data;
    },
    patchOne: async (payload: IPoint) => {
        // Нужно обновить одну точку по его id
        const { data } = await httpService.patch(
            pointsEndPoint + payload.properties._id,
            payload
        );
        // Нужно вернуть массив точек
        return data;
    },
    removePoint: async (id: string) => {
        const { data } = await httpService.delete(pointsEndPoint + id);
        return data;
    },
};

export default pointsService;
