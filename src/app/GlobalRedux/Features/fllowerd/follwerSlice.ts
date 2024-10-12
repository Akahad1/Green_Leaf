import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../Store";

type TFollow = {
  id: string;
};
const initialState: TFollow = {
  id: "",
};

const follwerSlice = createSlice({
  name: "FollowerId",
  initialState,
  reducers: {
    addFollowerId: (state, action) => {
      const { id } = action.payload;
      console.log("internal", id);
      state.id = id;
    },
  },
});
export const { addFollowerId } = follwerSlice.actions;
export default follwerSlice.reducer;

export const useFollwerId = (state: RootState) => state.FollowerId.id;
