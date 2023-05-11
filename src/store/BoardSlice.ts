import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../../public/data.json";
import { Board } from "../interface/interfaces";

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

const initialState = {
  boards: initialBoardState,
  activeBoardIndex: 0,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<number>) => {
      state.activeBoardIndex = action.payload;
    },
  },
});

export const { setActiveBoard } = boardSlice.actions;
export default boardSlice.reducer;
