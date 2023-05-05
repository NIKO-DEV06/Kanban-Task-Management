import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./ThemeSlice";

export default configureStore({
  reducer: {
    theme: ThemeReducer,
  },
});
