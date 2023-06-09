import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UiState } from "../interface/interfaces";

const initialState: UiState = {
  theme: false,
  sidebar: true,
  mobileMenu: false,
  viewTask: false,
  addTask: false,
  deleteTask: false,
  editTask: false,
  addBoard: false,
  deleteBoard: false,
  editBoard: false,
};

const uiSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
    toggleSideBar: (state, action: PayloadAction<boolean>) => {
      state.sidebar = action.payload;
    },
    toggleMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.mobileMenu = action.payload;
    },
    toogleViewTaskModal: (state, action: PayloadAction<boolean>) => {
      state.viewTask = action.payload;
    },
    toogleAddTaskModal: (state, action: PayloadAction<boolean>) => {
      state.addTask = action.payload;
    },
    toogleDeleteTaskModal: (state, action: PayloadAction<boolean>) => {
      state.deleteTask = action.payload;
    },
    toogleEditTaskModal: (state, action: PayloadAction<boolean>) => {
      state.editTask = action.payload;
    },
    toogleAddBoardModal: (state, action: PayloadAction<boolean>) => {
      state.addBoard = action.payload;
    },
    toogleDeleteBoardModal: (state, action: PayloadAction<boolean>) => {
      state.deleteBoard = action.payload;
    },
    toogleEditBoardModal: (state, action: PayloadAction<boolean>) => {
      state.editBoard = action.payload;
    },
  },
});

export const {
  toggleTheme,
  toggleSideBar,
  toggleMobileMenu,
  toogleViewTaskModal,
  toogleAddTaskModal,
  toogleDeleteTaskModal,
  toogleEditTaskModal,
  toogleAddBoardModal,
  toogleDeleteBoardModal,
  toogleEditBoardModal,
} = uiSlice.actions;
export default uiSlice.reducer;
