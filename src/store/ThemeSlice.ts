import { createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "../types/types";

const initialState: ThemeState = {
  theme: false,
  sidebar: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
    openSideBar: (state) => {
      state.sidebar = true;
    },
    closeSidebar: (state) => {
      state.sidebar = false;
    },
  },
});

export const { toggleTheme, openSideBar, closeSidebar } = themeSlice.actions;
export default themeSlice.reducer;
