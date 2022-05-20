import { createAction, createSlice } from "@reduxjs/toolkit";

// const initialData = localStorageService.getAccessToken()
//   ? {
//       entities: null,
//       isLoading: true,
//       error: null,
//       auth: { userId: localStorageService.getUserId() },
//       isLoggedIn: true,
//       dataLoaded: false,
//     }
//   : {
//       entities: null,
//       isLoading: false,
//       error: null,
//       auth: null,
//       isLoggedIn: false,
//       dataLoaded: false,
//     };

const usersSlice = createSlice({
  name: "users",
  //   initialData,
  reducers: {
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdated: (state, action) => {
      state.entities = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;

const authRequested = createAction("users/authRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    // const data = await authService.register(payload);
    // localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    // history.push("/");
    // const user = await userService.get();
    dispatch(usersRecieved(user));
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const logIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      //   const data = await authService.login({ email, password });
      //   localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      //   history.push(redirect);
      //   const user = await userService.get();
      dispatch(usersRecieved(user));
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const deleteUser = () => async (dispatch) => {
  try {
    // const user = await userService.delete();
    // if (user._id === localStorageService.getUserId()) {
    //   dispatch(logOut());
    // } else {
    //   console.error("Something was wrong");
    // }
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  //   localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  //   history.push("/");
};

export const loadUser = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    // const user = await userService.get();
    dispatch(usersRecieved(user));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    // const data = await userService.patch(payload);
    dispatch(userUpdated(data));
    // history.push("/");
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export default usersReducer;
