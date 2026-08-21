import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../providers/useAuth";
import {
  createBoard,
  deleteBoard,
  getBoards,
} from "../services/boards.service";
import type { Board } from "../types/board.types";

export const useBoards = () => {
  const { user } = useAuth();

  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoards = useCallback(async () => {
    if (!user) {
      setBoards([]);
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const data = await getBoards();

      setBoards(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Не удалось загрузить доски",
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    queueMicrotask(() => void fetchBoards());
  }, [fetchBoards]);

  const addBoard = async (title: string) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    await createBoard({ title }, user.id);

    await fetchBoards();
  };

  const removeBoard = async (boardId: string) => {
    await deleteBoard(boardId);

    setBoards((currentBoards) =>
      currentBoards.filter((board) => board.id !== boardId),
    );
  };

  return {
    boards,
    isLoading,
    error,
    addBoard,
    removeBoard,
    refetch: fetchBoards,
  };
};
