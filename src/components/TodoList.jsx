
import { ClipboardList } from "lucide-react";
import TodoItem from "./TodoItem";

function TodoList({ tasks = [], onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <ClipboardList size={30} />
        </div>

        <h3 className="text-lg font-semibold text-slate-800">
          No tasks found
        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Add a new task or change your search and filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
