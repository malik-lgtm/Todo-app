
import { CalendarDays, Pencil, Trash2 } from "lucide-react";

function TodoItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className="flex min-w-0 items-start gap-2.5 rounded-xl border border-slate-200 p-3 transition hover:border-blue-200 hover:shadow-sm sm:gap-3 sm:p-4">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
        aria-label={`Mark ${task.title} as ${
          task.completed ? "pending" : "completed"
        }`}
      />

      <div className="min-w-0 flex-1">
        <h3
          className={`break-words text-sm font-semibold sm:text-base ${
            task.completed
              ? "text-slate-400 line-through"
              : "text-slate-800"
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="mt-1 break-words text-sm leading-5 text-slate-500 [overflow-wrap:anywhere]">
            {task.description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              task.priority === "high"
                ? "bg-red-50 text-red-600"
                : task.priority === "medium"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {task.priority || "low"} priority
          </span>

          {task.dueDate && (
            <span className="flex min-w-0 items-center gap-1 text-xs text-slate-500">
              <CalendarDays size={14} className="shrink-0" />
              <span className="break-words">{task.dueDate}</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
          title="Edit task"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 sm:h-10 sm:w-10"
        >
          <Pencil size={17} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          title="Delete task"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600 sm:h-10 sm:w-10"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}

export default TodoItem;
