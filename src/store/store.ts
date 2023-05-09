import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./ThemeSlice";
import boardReducer from "./BoardSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    board: boardReducer,
  },
});

export default store;
