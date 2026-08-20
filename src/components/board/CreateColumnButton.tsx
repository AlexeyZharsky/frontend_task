import { useState } from "react";

interface CreateColumnButtonProps {
  onCreate: (title: string) => Promise<void>;
}

const CreateColumnButton = ({ onCreate }: CreateColumnButtonProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    try {
      setIsCreating(true);

      await onCreate(normalizedTitle);

      setTitle("");
      setIsCreating(false);
    } catch {
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <button
        type="button"
        onClick={() => setIsCreating(true)}
        className="h-fit w-80 shrink-0 rounded-xl border border-dashed border-zinc-300 bg-white/60 p-4 text-left text-sm font-medium text-zinc-500 transition hover:border-zinc-400 hover:bg-white hover:text-zinc-900"
      >
        + Добавить колонку
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit w-80 shrink-0 rounded-xl bg-zinc-100 p-3"
    >
      <input
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Название колонки"
        maxLength={100}
        required
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900"
      />

      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-3 py-2 text-xs font-medium text-white hover:bg-zinc-800"
        >
          Добавить
        </button>

        <button
          type="button"
          onClick={() => {
            setIsCreating(false);
            setTitle("");
          }}
          className="rounded-md px-3 py-2 text-xs text-zinc-500 hover:bg-zinc-200"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default CreateColumnButton;
