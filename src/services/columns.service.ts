import type { BoardColumn, CreateColumnInput } from "../types/column.types";
import { supabase } from "./supabase";

export const getColumns = async (boardId: string): Promise<BoardColumn[]> => {
  const { data, error } = await supabase
    .from("columns")
    .select("*")
    .eq("board_id", boardId)
    .order("position", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const createColumn = async (
  input: CreateColumnInput,
): Promise<BoardColumn> => {
  const { data, error } = await supabase
    .from("columns")
    .insert(input)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateColumn = async (
  columnId: string,
  title: string,
): Promise<BoardColumn> => {
  const { data, error } = await supabase
    .from("columns")
    .update({
      title,
    })
    .eq("id", columnId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteColumn = async (columnId: string): Promise<void> => {
  const { error } = await supabase.from("columns").delete().eq("id", columnId);

  if (error) {
    throw error;
  }
};
