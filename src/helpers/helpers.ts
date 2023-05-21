import { Column } from "../interface/interfaces";

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
