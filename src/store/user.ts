import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService, { IEmailAndPassword } from "../services/authService";
import localStorageService from "../services/localStorageService";
import userService from "../services/userService";
import { generateAuthError } from "../utils/generateAuthError";

type UserDateType = {
    name: string;
};

type AuthDataType = {
    [key: string]: string;
};

interface UserState {
    entities: UserDateType | null;
    isLoading: boolean;
    error: string | null;
    auth: AuthDataType | null;
    isLoggedIn: boolean;
    dataLoaded: boolean;
}

const initialData: UserState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false,
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false,
      };

const userSlice = createSlice({
    name: "users",
    initialData,
    reducers: {
        authRequestSuccess: (state, action: PayloadAction<AuthDataType>) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequested: (state) => {
            state.error = null;
        },
        authRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        usersRecieved: (state, action: PayloadAction<UserDateType>) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        usersRequestFailed: (state, action: PayloadAction<string>) => {
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
    },
});

const { reducer: usersReducer, actions } = userSlice;
const {
    usersRequested,
    usersRecieved,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    userUpdated,
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const signUp = (payload: any) => async (dispatch: any) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        // history.push("/");
        const user = await userService.get();
        dispatch(usersRecieved(user));
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
    payload: IEmailAndPassword;
};

export const logIn =
    ({
        payload,
    }: // redirect
    LoginType) =>
    async (dispatch: any) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            //   history.push(redirect);
            const user = await userService.get();
            dispatch(usersRecieved(user));
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

export const deleteUser = () => async (dispatch: any) => {
    try {
        const user = await userService.delete();
        if (user._id === localStorageService.getUserId()) {
            dispatch(logOut());
        } else {
            console.error("Something was wrong");
        }
    } catch (error: any) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch: any) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    //   history.push("/");
};

export const loadUser = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const user = await userService.get();
        dispatch(usersRecieved(user));
    } catch (error: any) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const updateUser = (payload: any) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const data = await userService.patch(payload);
        dispatch(userUpdated(data));
        // history.push("/");
    } catch (error: any) {
        dispatch(userUpdateFailed(error.message));
    }
};

export default usersReducer;
