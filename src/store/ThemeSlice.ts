import { createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "../interface/interfaces";

const initialState: ThemeState = {
  theme: false,
  sidebar: true,
  mobileMenu: false,
  viewTask: false,
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
    openViewTaskModal: (state) => {
      state.viewTask = true;
    },
    closeViewTaskModal: (state) => {
      state.viewTask = false;
    },
  },
});

export const {
  toggleTheme,
  openSideBar,
  closeSidebar,
  openMobileMenu,
  closeMobileMenu,
  openViewTaskModal,
  closeViewTaskModal,
} = themeSlice.actions;
export default themeSlice.reducer;
