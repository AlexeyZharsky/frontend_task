import { useParams } from "react-router-dom";
import ColumnCard from "../components/board/ColumnCard";
import CreateColumnButton from "../components/board/CreateColumnButton";
import Header from "../components/shared/Header";
import { useColumns } from "../hooks/useColumns";

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();

  const { columns, isLoading, error, addColumn, renameColumn, removeColumn } =
    useColumns(boardId);

  const handleRename = async (columnId: string, title: string) => {
    try {
      await renameColumn(columnId, title);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (columnId: string) => {
    try {
      await removeColumn(columnId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (title: string) => {
    try {
      await addColumn(title);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-zinc-50">
      <Header />

      <div className="flex-1 overflow-x-auto mx-auto max-w-7xl px-4 py-8">
        <div className="flex min-h-full gap-4 p-4">
          {isLoading ? (
            <>
              <div className="h-96 w-80 shrink-0 animate-pulse rounded-xl bg-zinc-200" />
              <div className="h-96 w-80 shrink-0 animate-pulse rounded-xl bg-zinc-200" />
              <div className="h-96 w-80 shrink-0 animate-pulse rounded-xl bg-zinc-200" />
            </>
          ) : (
            <>
              {columns.map((column) => (
                <ColumnCard
                  key={column.id}
                  column={column}
                  onRename={handleRename}
                  onDelete={handleDelete}
                />
              ))}

              <CreateColumnButton onCreate={handleCreate} />
            </>
          )}

          {error && (
            <div className="fixed bottom-4 right-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 shadow-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BoardPage;
