import type { Task } from "../../types/task.types";

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => Promise<void>;
}

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  const handleDelete = async () => {
    await onDelete(task.id);
  };

  return (
    <article className="group rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 flex-1 break-words text-sm font-medium">
          {task.title}
        </p>

        <button
          type="button"
          onClick={() => void handleDelete()}
          className="shrink-0 text-xs text-zinc-400 opacity-0 transition hover:text-red-500 group-hover:opacity-100"
        >
          Удалить
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
