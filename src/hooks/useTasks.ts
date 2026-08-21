import { useCallback, useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  moveTask,
  updateTask,
} from "../services/tasks.service";
import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "../types/task.types";

export const useTasks = (columnIds: string[]) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getTasks(columnIds);

      setTasks(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Не удалось загрузить задачи",
      );
    } finally {
      setIsLoading(false);
    }
  }, [columnIds]);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  const addTask = async (input: CreateTaskInput) => {
    const newTask = await createTask(input);

    setTasks((currentTasks) => [...currentTasks, newTask]);

    return newTask;
  };

  const editTask = async (taskId: string, input: UpdateTaskInput) => {
    const updatedTask = await updateTask(taskId, input);

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
    );

    return updatedTask;
  };

  const removeTask = async (taskId: string) => {
    await deleteTask(taskId);

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  const move = async (taskId: string, columnId: string, position: number) => {
    const updatedTask = await moveTask(taskId, columnId, position);

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
    );

    return updatedTask;
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    editTask,
    removeTask,
    move,
    refetch: fetchTasks,
  };
};
