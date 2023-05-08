import { createSlice } from "@reduxjs/toolkit";
import data from "../../public/data.json";

const counterSlice = createSlice({
  name: "board",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
