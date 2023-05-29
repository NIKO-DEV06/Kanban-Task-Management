import { store } from "../store/store";

export interface RootThemeState {
  ui: UiState;
}

export interface UiState {
  theme: boolean;
  sidebar: boolean;
  mobileMenu: boolean;
  viewTask: boolean;
  addTask: boolean;
  deleteTask: boolean;
  editTask: boolean;
  addBoard: boolean;
  deleteBoard: boolean;
  editBoard: boolean;
}
export interface RootState {
  boards: Board[];
  activeBoardIndex: number;
  activeColumn?: number | null;
  activeTask?: Task | null;
  dragState: Board[];
}

export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
}

export interface Subtask {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface DND {
  dragIndex: number;
  dropIndex: number;
  dragStatus: string;
  dropStatus: string;
  draggableId: string;
}

export type State = ReturnType<typeof store.getState>;
