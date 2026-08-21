import type { Json } from "../types/database.types";
import type {
  CreateTaskInput,
  ReorderTaskPayload,
  Task,
  UpdateTaskInput,
} from "../types/task.types";
import { supabase } from "./supabase";

export const getTasks = async (columnIds: string[]): Promise<Task[]> => {
  if (columnIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .in("column_id", columnIds)
    .order("position", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const createTask = async (input: CreateTaskInput): Promise<Task> => {
  const { data, error } = await supabase
    .from("tasks")
    .insert(input)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateTask = async (
  taskId: string,
  input: UpdateTaskInput,
): Promise<Task> => {
  const { data, error } = await supabase
    .from("tasks")
    .update(input)
    .eq("id", taskId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw error;
  }
};

export const reorderTasks = async (
  tasks: ReorderTaskPayload[],
): Promise<void> => {
  const { error } = await supabase.rpc("reorder_tasks", {
    p_tasks: tasks as unknown as Json,
  });

  if (error) {
    throw error;
  }
};
