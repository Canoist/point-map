import {
    createAction,
    createSlice,
    Dispatch,
    PayloadAction
} from "@reduxjs/toolkit";
import authService from "../services/authService";
import localStorageService from "../services/localStorageService";
import userService from "../services/userService";
import { FiledValues } from "../ui/signInForm";
import { generateAuthError } from "../utils/generateAuthError";
import history from "../utils/history";

type UserDateType = {
    firstname: string;
    lastname: string;
};

type AuthDataType = {
    [key: string]: string | null;
};

interface UserState {
    entities: UserDateType | null;
    isLoading: boolean;
    error: string | null;
    auth: AuthDataType | null;
    isLoggedIn: boolean;
    dataLoaded: boolean;
}

const initialState: UserState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authRequestSuccess: (state, action: PayloadAction<AuthDataType>) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.error = null;
            state.isLoading = true;
        },
        userRequested: (state) => {
            state.isLoading = true;
        },
        authRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        userRecieved: (state, action: PayloadAction<UserDateType>) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        userRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdated: (state, action: PayloadAction<UserDateType>) => {
            state.entities = action.payload;
        },
        userUpdateFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: userReducer, actions } = userSlice;
const {
    userRequested,
    userRecieved,
    userRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    userUpdated,
    userUpdateFailed
} = actions;

const authRequested = createAction("user/authRequested");
const userUpdateRequested = createAction("user/userUpdateRequested");

export const signUp = (payload: any) => async (dispatch: Dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        const user = await userService.get();
        dispatch(userRecieved(user));
    } catch (error: any) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

type LoginType = {
    payload: FiledValues;
    redirect?: any;
};

export const logIn =
    ({ payload, redirect }: LoginType) =>
    async (dispatch: Dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            history.push(redirect);
            const user = await userService.get();
            dispatch(userRecieved(user));
        } catch (error: any) {
            console.log(error.message);

            const { code, message } = error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const deleteUser = () => async (dispatch: Dispatch) => {
    try {
        const user = await userService.delete();
        if (user._id === localStorageService.getUserId()) {
            localStorageService.removeAuthData();
            dispatch(userLoggedOut());
        } else {
            console.error("Something was wrong");
        }
    } catch (error: any) {
        dispatch(userRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch: Dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
};

export const loadUser = () => async (dispatch: Dispatch) => {
    dispatch(userRequested());
    try {
        const user = await userService.get();
        dispatch(userRecieved(user));
    } catch (error: any) {
        dispatch(userRequestFailed(error.message));
    }
};

export const updateUser = (payload: any) => async (dispatch: Dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const data = await userService.patch(payload);
        dispatch(userUpdated(data));
    } catch (error: any) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const getUserData = () => (state: { users: UserState }) =>
    state.users.entities;
export const getUsersLoadingStatus = () => (state: { users: UserState }) =>
    state.users.isLoading;
export const getIsLoggedIn = () => (state: { users: UserState }) =>
    state.users.isLoggedIn;
export const getDataStatus = () => (state: { users: UserState }) =>
    state.users.dataLoaded;
export const getCurrentUserId = () => (state: { users: UserState }) =>
    state.users.auth!.userId;
export const getAuthErrors = () => (state: { users: UserState }) =>
    state.users.error;
export const resetAuthErrors = () => (dispatch: Dispatch) =>
    dispatch(authRequested());

export default userReducer;
