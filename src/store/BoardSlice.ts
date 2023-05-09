import { createSlice } from "@reduxjs/toolkit";
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

const boardSlice = createSlice({
  name: "board",
  initialState: initialBoardState,
  reducers: {},
});

export const {} = boardSlice.actions;
export default boardSlice.reducer;
