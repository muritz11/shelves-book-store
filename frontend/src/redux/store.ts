import {
  configureStore,
  // getDefaultMiddleware
} from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import authReducer from "./features/authSlice";
import { accountApi } from "./services/accountApi";
import { authorApi } from "./services/authorApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      accountApi.middleware,
      authorApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
