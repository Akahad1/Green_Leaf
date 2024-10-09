import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../Store";

type TAuth = {
  id: string;
};
const initialState: TAuth = {
  id: "",
};

const userSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    addUserId: (state, action) => {
      const { id } = action.payload;
      console.log("internal", id);
      state.id = id;
    },
  },
});
export const { addUserId } = userSlice.actions;
export default userSlice.reducer;

export const useCurrentId = (state: RootState) => state.userId.id;
