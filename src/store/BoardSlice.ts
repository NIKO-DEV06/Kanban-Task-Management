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
  dragState: initialBoardState,
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
    updateTask: (state, action: PayloadAction<Task>) => {
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
    deleteTask: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const updatedColumns = state.boards[state.activeBoardIndex].columns.map(
        (column) => ({
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        })
      );
      state.boards[state.activeBoardIndex].columns = updatedColumns;
      state.activeTask = null;
    },
    editTask: (
      state: RootState,
      action: PayloadAction<{ task: Task; selectedStatus: string }>
    ) => {
      if (state.activeTask) {
        const { task, selectedStatus } = action.payload;
        const targetColumn = state.boards[state.activeBoardIndex].columns.find(
          (column) => column.name === selectedStatus
        );

        if (targetColumn) {
          const existingTaskIndex = targetColumn.tasks.findIndex(
            (tsk) => tsk.id === task.id
          );
          const updatedTask = {
            ...state.activeTask,
            title: task.title,
            description: task.description,
            subtasks: task.subtasks,
          };

          if (state.activeColumn && state.activeColumn !== targetColumn.id) {
            const sourceColumn = state.boards[
              state.activeBoardIndex
            ].columns.find((column) =>
              column.tasks?.some((task) => task.id === state.activeTask?.id)
            );

            if (sourceColumn) {
              const taskIndex = sourceColumn.tasks.findIndex(
                (tsk) => tsk.id === state.activeTask?.id
              );

              if (taskIndex !== -1) {
                sourceColumn.tasks.splice(taskIndex, 1);
              }
            }
          }

          if (existingTaskIndex !== -1) {
            const updatedTask = {
              ...task,
            };
            targetColumn.tasks.splice(existingTaskIndex, 1, updatedTask);
          } else {
            state.boards[state.activeBoardIndex].columns
              .find((col) => col.name === selectedStatus)
              ?.tasks.push(updatedTask);
          }

          state.activeTask = updatedTask;
        }
      }
    },
    addNewBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
      state.activeBoardIndex = state.boards.length - 1;
    },
    deleteBoard: (state, action: PayloadAction<number>) => {
      const boardIndex = action.payload;
      state.boards = state.boards.filter((_, index) => index !== boardIndex);
      state.activeBoardIndex = 0;
    },
    editBoard: (state, action: PayloadAction<Board>) => {
      const editedBoard = action.payload;
      state.boards[state.activeBoardIndex] = editedBoard;
    },
    updateTaskPosition: (
      state,
      action: PayloadAction<{
        sourceColumnId: number;
        destinationColumnId: number;
        sourceIndex: number;
        destinationIndex: number;
      }>
    ) => {
      const {
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
      } = action.payload;

      // Find the source and destination columns
      const sourceColumn = state.boards[state.activeBoardIndex].columns.find(
        (column) => column.id === sourceColumnId
      );
      const destinationColumn = state.boards[
        state.activeBoardIndex
      ].columns.find((column) => column.id === destinationColumnId);
      if (sourceColumn && destinationColumn) {
        // Remove the task from the source column
        const draggedTask = sourceColumn.tasks.splice(sourceIndex, 1)[0];

        // Insert the task into the destination column
        destinationColumn.tasks.splice(destinationIndex, 0, draggedTask);
      }
    },
  },
});

export const {
  setActiveBoard,
  setActiveColumn,
  viewTask,
  updateTask,
  addTask,
  deleteTask,
  editTask,
  addNewBoard,
  deleteBoard,
  editBoard,
  updateTaskPosition,
} = boardSlice.actions;
export default boardSlice.reducer;
