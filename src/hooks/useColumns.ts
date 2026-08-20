import { useCallback, useEffect, useState } from "react";
import {
  createColumn,
  deleteColumn,
  getColumns,
  updateColumn,
} from "../services/columns.service";
import type { BoardColumn } from "../types/column.types";

export const useColumns = (boardId: string | undefined) => {
  const [columns, setColumns] = useState<BoardColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchColumns = useCallback(async () => {
    if (!boardId) {
      setColumns([]);
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const data = await getColumns(boardId);

      setColumns(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Не удалось загрузить колонки",
      );
    } finally {
      setIsLoading(false);
    }
  }, [boardId]);

  useEffect(() => {
    fetchColumns();
  }, [fetchColumns]);

  const addColumn = async (title: string) => {
    if (!boardId) {
      throw new Error("Board ID is missing");
    }

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    const position =
      columns.length > 0
        ? Math.max(...columns.map((column) => column.position)) + 1
        : 0;

    const newColumn = await createColumn({
      board_id: boardId,
      title: normalizedTitle,
      position,
    });

    setColumns((currentColumns) => [...currentColumns, newColumn]);
  };

  const renameColumn = async (columnId: string, title: string) => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    const updatedColumn = await updateColumn(columnId, normalizedTitle);

    setColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.id === columnId ? updatedColumn : column,
      ),
    );
  };

  const removeColumn = async (columnId: string) => {
    await deleteColumn(columnId);

    setColumns((currentColumns) =>
      currentColumns.filter((column) => column.id !== columnId),
    );
  };

  return {
    columns,
    isLoading,
    error,
    addColumn,
    renameColumn,
    removeColumn,
    refetch: fetchColumns,
  };
};
