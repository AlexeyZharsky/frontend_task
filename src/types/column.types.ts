import type { Tables, TablesInsert } from "./database.types";

export type BoardColumn = Tables<"columns">;

export type CreateColumnInput = Pick<
  TablesInsert<"columns">,
  "board_id" | "title" | "position"
>;
