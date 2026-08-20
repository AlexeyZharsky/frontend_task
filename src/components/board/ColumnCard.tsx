import { useState } from "react";
import type { BoardColumn } from "../../types/column.types";

interface ColumnCardProps {
  column: BoardColumn;
  onRename: (columnId: string, title: string) => Promise<void>;
  onDelete: (columnId: string) => Promise<void>;
}

const ColumnCard = ({ column, onRename, onDelete }: ColumnCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [isSaving, setIsSaving] = useState(false);

  const handleRename = async () => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle || normalizedTitle === column.title) {
      setTitle(column.title);
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);

      await onRename(column.id, normalizedTitle);

      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    await onDelete(column.id);
  };

  return (
    <section className="flex w-80 shrink-0 flex-col rounded-xl bg-zinc-100 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        {isEditing ? (
          <input
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                void handleRename();
              }

              if (event.key === "Escape") {
                setTitle(column.title);
                setIsEditing(false);
              }
            }}
            disabled={isSaving}
            className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm font-semibold outline-none focus:border-zinc-900"
          />
        ) : (
          <h2 className="min-w-0 flex-1 truncate px-1 text-sm font-semibold text-zinc-800">
            {column.title}
          </h2>
        )}

        <div className="flex shrink-0 items-center gap-1">
          {isEditing ? (
            <button
              type="button"
              onClick={() => void handleRename()}
              disabled={isSaving}
              className="rounded-md px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
            >
              Сохранить
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-md px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
            >
              Изменить
            </button>
          )}

          <button
            type="button"
            onClick={() => void handleDelete()}
            className="rounded-md px-2 py-1 text-xs text-red-500 hover:bg-red-50"
          >
            Удалить
          </button>
        </div>
      </div>

      <div className="min-h-32 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-3">
        <p className="text-center text-xs text-zinc-400">
          Задачи появятся здесь
        </p>
      </div>
    </section>
  );
};

export default ColumnCard;
