import { Column } from "../interface/interfaces";

export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export function findTask(columns: Column[], taskId: number) {
  for (const column of columns) {
    for (const task of column.tasks) {
      if (task.id === taskId) {
        return task;
      }
    }
  }

  return null;
}
