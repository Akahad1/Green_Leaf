"use client";

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../Store";
export type TUser = {
  user: string;
  role: string;
  iat: number;
  exp: number;
};
type TAuth = {
  user: null | TUser;
  token: null | string;
};
const initialState: TAuth = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});
export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
