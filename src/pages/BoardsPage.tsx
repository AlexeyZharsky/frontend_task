import { useState } from "react";
import BoardCard from "../components/board/BoardCard";
import CreateBoardForm from "../components/board/CreateBoardForm";
import Header from "../components/shared/Header";
import { useBoards } from "../hooks/useBoards";

const BoardsPage = () => {
  const { boards, isLoading, error, addBoard, removeBoard } = useBoards();

  const [actionError, setActionError] = useState<string | null>(null);

  const handleCreateBoard = async (title: string) => {
    try {
      setActionError(null);

      await addBoard(title);
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Не удалось создать доску",
      );
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    try {
      setActionError(null);

      await removeBoard(boardId);
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Не удалось удалить доску",
      );
    }
  };

  return (
    <main className="min-h-screen bg-zinc-100">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">Мои доски</h2>

          <CreateBoardForm onCreate={handleCreateBoard} />

          {(error || actionError) && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error ?? actionError}
            </div>
          )}

          {isLoading ? (
            <div className="mt-8 grid max-w-5xl gap-4 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-40 animate-pulse rounded-xl bg-zinc-200"
                />
              ))}
            </div>
          ) : boards.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center">
              <h3 className="font-semibold">Создайте первую доску</h3>
            </div>
          ) : (
            <div className="mt-8 grid max-w-5xl gap-4 lg:grid-cols-3">
              {boards.map((board) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  onDelete={handleDeleteBoard}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BoardsPage;
