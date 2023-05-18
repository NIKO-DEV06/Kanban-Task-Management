import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../../public/data.json";
import { Board, RootState, Task } from "../interface/interfaces";
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
  activeColumn: null,
  activeTask: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<number>) => {
      state.activeBoardIndex = action.payload;
    },
    setActiveColumn: (state, action: PayloadAction<number>) => {
      state.activeColumn = action.payload;
    },

    viewTask: (state, action: PayloadAction<number>) => {
      const { boards, activeBoardIndex } = state;
      const activeTaskId = action.payload;
      const activeBoard = boards[activeBoardIndex];
      const task = findTask(activeBoard.columns, activeTaskId);
      state.activeTask = task;
    },
    updateTask(state, action: PayloadAction<Task>) {
      if (state.activeTask) {
        const { id, title, description, subtasks } = action.payload;
        const updatedTask: Task = {
          id,
          title,
          description,
          subtasks,
        };

        const updatedColumns = state.boards[state.activeBoardIndex].columns.map(
          (column) => ({
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === state.activeTask?.id ? updatedTask : task
            ),
          })
        );

        state.boards[state.activeBoardIndex].columns = updatedColumns;
        state.activeTask = updatedTask;
      }
    },
    addTask: (
      state,
      action: PayloadAction<{ task: Task; selectedStatus: string }>
    ) => {
      const { task, selectedStatus } = action.payload;
      const selectedColumn = state.boards[state.activeBoardIndex].columns.find(
        (column) => column.name === selectedStatus
      );
      selectedColumn?.tasks.push(task);
    },
  },
});

export const {
  setActiveBoard,
  setActiveColumn,
  viewTask,
  updateTask,
  addTask,
} = boardSlice.actions;
export default boardSlice.reducer;
