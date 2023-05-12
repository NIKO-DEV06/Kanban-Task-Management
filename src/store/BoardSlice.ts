import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../../public/data.json";
import { Board, RootState } from "../interface/interfaces";
import { findTask } from "../helpers/helpers";

let currentId = 0;

const initialBoardState: Board[] = data.boards.map((board) => {
  return {
    id: currentId++,
    name: board.name,
    columns: board.columns.map((column) => ({
      id: currentId++,
      name: column.name,
      tasks: column.tasks.map((task) => ({
        id: currentId++,
        title: task.title,
        description: task.description,
        subtasks: task.subtasks.map((subtask) => ({
          id: currentId++,
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        })),
      })),
    })),
  };
});

const initialState: RootState = {
  boards: initialBoardState,
  activeBoardIndex: 0,
  activeTask: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<number>) => {
      state.activeBoardIndex = action.payload;
    },
    // addBoard: (state, action: PayloadAction<Board>) => {
    //   return [...state.boards, action.payload];
    // },
    viewTask: (state, action: PayloadAction<number>) => {
      const { boards, activeBoardIndex } = state;
      const activeTaskId = action.payload;
      // Find the task in the active board
      const activeBoard = boards[activeBoardIndex];
      const task = findTask(activeBoard.columns, activeTaskId);
      // Update the active task in the state
      state.activeTask = task;
    },
  },
});

export const { setActiveBoard, viewTask } = boardSlice.actions;
export default boardSlice.reducer;
