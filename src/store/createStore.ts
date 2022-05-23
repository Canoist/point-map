import { configureStore } from "@reduxjs/toolkit";
import pointsReducer from "./points";
import usersReducer from "./user";

const store = configureStore({
    reducer: {
        points: pointsReducer,
        users: usersReducer,
    },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
