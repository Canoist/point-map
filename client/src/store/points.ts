import {
    createAction,
    createSlice,
    Dispatch,
    PayloadAction,
} from "@reduxjs/toolkit";
import points from "../mock/points";
import pointsService from "../services/pointsService";
import IPoint from "../types/IPoint";

type PointState = {
    entities: IPoint[];
    isLoading: boolean;
    dataLoaded: boolean;
    error: string | null;
};

const initialState: PointState = {
    entities: points,
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
        pointsRecieved: (state, action: PayloadAction<IPoint[]>) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        pointsRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        pointsUpdated: (state, action: PayloadAction<IPoint[]>) => {
            state.entities = action.payload;
        },
        pointsUpdateFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        pointDeleted: (state, action: PayloadAction<string>) => {
            state.entities = state.entities.filter(
                (point) => point.properties._id !== action.payload
            );
        },
        pointCreated: (state, action: PayloadAction<IPoint>) => {
            state.entities.push(action.payload);
        },
    },
});

const { reducer: pointsReducer, actions } = pointsSlice;
const {
    pointsRequested,
    pointsRecieved,
    pointsRequestFailed,
    pointsUpdated,
    pointsUpdateFailed,
    pointDeleted,
    pointCreated,
} = actions;

const pointsUpdateRequested = createAction("user/pointsUpdateRequested");

export const loadPoints = () => async (dispatch: Dispatch) => {
    dispatch(pointsRequested());
    try {
        const { content } = await pointsService.get();
        dispatch(pointsRecieved(content));
    } catch (error: any) {
        dispatch(pointsRequestFailed(error.message));
    }
};

export const createPoint = (payload: IPoint) => async (dispatch: Dispatch) => {
    try {
        const { content } = await pointsService.createPoint(payload);
        dispatch(pointCreated(content));
    } catch (error: any) {
        dispatch(pointsRequestFailed(error.message));
    }
};

export const updatePoints =
    (payload: IPoint[]) => async (dispatch: Dispatch) => {
        dispatch(pointsUpdateRequested());
        try {
            const data = await pointsService.patch(payload);
            dispatch(pointsUpdated(data));
        } catch (error: any) {
            dispatch(pointsUpdateFailed(error.message));
        }
    };

export const updateOnePoint =
    (payload: IPoint) => async (dispatch: Dispatch) => {
        dispatch(pointsUpdateRequested());
        try {
            const data = await pointsService.patchOne(payload);
            dispatch(pointsUpdated(data));
        } catch (error: any) {
            dispatch(pointsUpdateFailed(error.message));
        }
    };

export const removePoint = (id: string) => async (dispatch: Dispatch) => {
    console.log(id);

    try {
        // const { content } = await pointsService.removePoint(id);
        // if (content === null) {
        dispatch(pointDeleted(id));
        // }
    } catch (error: any) {
        dispatch(pointsRequestFailed(error.message));
    }
};

export const getPoints = () => (state: { points: PointState }) =>
    state.points.entities;
export const getPointsLoadingStatus = () => (state: { points: PointState }) =>
    state.points.isLoading;
export const getPointsDataStatus = () => (state: { points: PointState }) =>
    state.points.dataLoaded;

export default pointsReducer;
