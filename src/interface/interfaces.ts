import store from "../store/store";

export interface RootThemeState {
  theme: ThemeState;
}

export interface ThemeState {
  theme: boolean;
  sidebar: boolean;
  mobileMenu: boolean;
  viewTask: boolean;
}
export interface RootState {
  boards: Board[];
  activeBoardIndex: number;
  activeTask?: Task | null;
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

export type State = ReturnType<typeof store.getState>;
