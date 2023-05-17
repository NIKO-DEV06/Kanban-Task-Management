import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./UiSlice";
import boardReducer from "./BoardSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    board: boardReducer,
  },
});

export default store;
