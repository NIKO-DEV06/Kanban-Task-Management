import { createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "../interface/interfaces";

const initialState: ThemeState = {
  theme: false,
  sidebar: true,
  mobileMenu: false,
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
    openMobileMenu: (state) => {
      state.mobileMenu = true;
    },
    closeMobileMenu: (state) => {
      state.mobileMenu = false;
    },
  },
});

export const {
  toggleTheme,
  openSideBar,
  closeSidebar,
  openMobileMenu,
  closeMobileMenu,
} = themeSlice.actions;
export default themeSlice.reducer;
