import type { Task } from "../types/task.types";

export const reorderTasks = (
  tasks: Task[],
  sourceTaskId: string,
  sourceColumnId: string,
  targetColumnId: string,
  targetIndex: number,
): Task[] => {
  const sourceTasks = tasks
    .filter((task) => task.column_id === sourceColumnId)
    .sort((first, second) => first.position - second.position);

  const targetTasks =
    sourceColumnId === targetColumnId
      ? sourceTasks
      : tasks
          .filter((task) => task.column_id === targetColumnId)
          .sort((first, second) => first.position - second.position);

  const sourceIndex = sourceTasks.findIndex((task) => task.id === sourceTaskId);

  if (sourceIndex === -1) {
    return tasks;
  }

  const movedTask = sourceTasks[sourceIndex];
  const nextSource = [...sourceTasks];

  nextSource.splice(sourceIndex, 1);

  if (sourceColumnId === targetColumnId) {
    nextSource.splice(targetIndex, 0, movedTask);

    return [
      ...tasks.filter((task) => task.column_id !== sourceColumnId),
      ...nextSource.map((task, index) => ({ ...task, position: index })),
    ];
  }

  const nextTarget = [...targetTasks];

  nextTarget.splice(targetIndex, 0, {
    ...movedTask,
    column_id: targetColumnId,
  });

  return [
    ...tasks.filter(
      (task) =>
        task.column_id !== sourceColumnId && task.column_id !== targetColumnId,
    ),
    ...nextSource.map((task, index) => ({ ...task, position: index })),
    ...nextTarget.map((task, index) => ({ ...task, position: index })),
  ];
};
