export interface RootThemeState {
  theme: {
    theme: boolean;
    sidebar: boolean;
  };
}

export interface ThemeState {
  theme: boolean;
  sidebar: boolean;
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
