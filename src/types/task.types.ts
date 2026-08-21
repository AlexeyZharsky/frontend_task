import type { Tables, TablesInsert, TablesUpdate } from "./database.types";

export type Task = Tables<"tasks">;

export type CreateTaskInput = Pick<
  TablesInsert<"tasks">,
  "column_id" | "title" | "position" | "created_by"
>;

export type UpdateTaskInput = Pick<
  TablesUpdate<"tasks">,
  "title" | "description" | "priority" | "due_date" | "assignee_id"
>;

export interface ReorderTaskPayload {
  id: string;
  column_id: string;
  position: number;
}
