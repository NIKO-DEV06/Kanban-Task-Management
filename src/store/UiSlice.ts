import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "../interface/interfaces";

const initialState: UiState = {
  theme: false,
  sidebar: true,
  mobileMenu: false,
  viewTask: false,
};

const uiSlice = createSlice({
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
} = uiSlice.actions;
export default uiSlice.reducer;
