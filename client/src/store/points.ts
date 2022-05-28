import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import pointsService from "../services/pointsService";

type PointDateType = {
    type: string;
    properties: {
        ID: string;
        NAME: string;
        DESCRIPTIO: string;
        date: number;
    };
    geometry: {
        type: string;
        coordinates: number[];
    };
};

type PointState = {
    entities: PointDateType[];
    isLoading: boolean;
    dataLoaded: boolean;
    error: string | null;
};

const initialState: PointState = {
    entities: [
        {
            type: "Feature",
            properties: {
                ID: "60.6788189882135130.00185121217478",
                NAME: "База рафтинга Кивиниеми",
                DESCRIPTIO: "Основную часть кода писал здесь",
                date: 1652247815757,
            },
            geometry: {
                type: "Point",
                coordinates: [60.67881898821351, 30.00185121217478],
            },
        },
        {
            type: "Feature",
            properties: {
                ID: "60.4475909774236330.28923155946069",
                NAME: "Фигурное озеро",
                DESCRIPTIO:
                    "Был судьей на соревнованиях по рафингу на этом озере 14-15 мая",
                date: 1652647215757,
            },
            geometry: {
                type: "Point",
                coordinates: [60.44759097742363, 30.28923155946069],
            },
        },
    ],
    isLoading: false,
    dataLoaded: false,
    error: null,
};

const pointsSlice = createSlice({
    name: "points",
    initialState,
    reducers: {
        pointsRequested: (state) => {
            state.isLoading = true;
        },
        pointsRecieved: (state, action: PayloadAction<PointDateType[]>) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        pointRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { reducer: pointsReducer, actions } = pointsSlice;
const { pointsRequested, pointsRecieved, pointRequestFailed } = actions;

export const loadPoints = () => async (dispatch: Dispatch) => {
    dispatch(pointsRequested());
    try {
        const { content } = await pointsService.get();
        dispatch(pointsRecieved(content));
    } catch (error: any) {
        dispatch(pointRequestFailed(error.message));
    }
};

export default pointsReducer;