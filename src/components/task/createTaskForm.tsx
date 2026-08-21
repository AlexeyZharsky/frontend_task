import { useState } from "react";

interface CreateTaskFormProps {
  onCreate: (title: string) => Promise<void>;
}

const CreateTaskForm = ({ onCreate }: CreateTaskFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    try {
      setIsCreating(true);

      await onCreate(normalizedTitle);

      setTitle("");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Название задачи..."
        maxLength={200}
        disabled={isCreating}
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
      />

      {title.trim() && (
        <button
          type="submit"
          disabled={isCreating}
          className="mt-2 w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCreating ? "Создание..." : "Добавить задачу"}
        </button>
      )}
    </form>
  );
};

export default CreateTaskForm;
