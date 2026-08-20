import { useState } from "react";

interface CreateBoardFormProps {
  onCreate: (title: string) => Promise<void>;
}

const CreateBoardForm = ({ onCreate }: CreateBoardFormProps) => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onCreate(normalizedTitle);

      setTitle("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Название доски"
        maxLength={100}
        required
        className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-zinc-900 px-5 py-2.5 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Создание..." : "Создать доску"}
      </button>
    </form>
  );
};

export default CreateBoardForm;
