"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/auth/authSlice";
import userIdReducer from "./Features/auth/userSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./Features/api/baseApi";

const persistConfig = {
  key: "auth",
  storage,
};
const userpersistConfig = {
  key: "userId",
  storage,
};

const parsistAuthReducer = persistReducer(persistConfig, authReducer);
const parsistuserIdReducer = persistReducer(userpersistConfig, userIdReducer);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: parsistAuthReducer,
    userId: parsistuserIdReducer,
  },
  middleware: (getDefultMiddleware) =>
    getDefultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const parsistor = persistStore(store);
