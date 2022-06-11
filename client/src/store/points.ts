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
    },
});

const { reducer: pointsReducer, actions } = pointsSlice;
const {
    pointsRequested,
    pointsRecieved,
    pointsRequestFailed,
    pointsUpdated,
    pointsUpdateFailed,
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

export const updateOnePoint = (payload: IPoint) => async (dispatch: Dispatch) => {
    dispatch(pointsUpdateRequested());
    try {
        const data = await pointsService.patchOne(payload);
        dispatch(pointsUpdated(data));
    } catch (error: any) {
        dispatch(pointsUpdateFailed(error.message));
    }
}

export default pointsReducer;
