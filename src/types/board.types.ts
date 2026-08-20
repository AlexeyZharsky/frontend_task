import type { Tables, TablesInsert } from "./database.types";

export type Board = Tables<"boards">;

export type CreateBoardInput = Pick<TablesInsert<"boards">, "title">;
