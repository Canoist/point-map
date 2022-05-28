import httpService from "./httpService";

const pointsEndPoint = "points/";

const pointsService = {
    get: async () => {
        const { data } = await httpService.get(pointsEndPoint);
        return data;
    },
};

export default pointsService;
