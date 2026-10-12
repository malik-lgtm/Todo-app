
import { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";

function TodoForm({ onSubmitTask, editingTodo, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || "");
      setPriority(editingTodo.priority || "low");
      setDueDate(editingTodo.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("low");
      setDueDate("");
    }
  }, [editingTodo]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    onSubmitTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setPriority("low");
    setDueDate("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6"
    >
      <div>
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          {editingTodo ? "Edit Task" : "Add a New Task"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {editingTodo
            ? "Update your task details below."
            : "Plan your next task and keep moving forward."}
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What do you need to do?"
          required
          maxLength={200}
          className="w-full min-w-0 rounded-xl border border-slate-200 px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description (optional)"
          rows={3}
          maxLength={1000}
          className="w-full min-w-0 resize-y rounded-xl border border-slate-200 px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="min-w-0">
            <label
              htmlFor="task-priority"
              className="mb-1.5 block text-sm font-medium text-slate-600"
            >
              Priority
            </label>

            <select
              id="task-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="task-due-date"
              className="mb-1.5 block text-sm font-medium text-slate-600"
            >
              Due date
            </label>

            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pt-1 sm:flex-row">
        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
        >
          {editingTodo ? <Save size={18} /> : <Plus size={18} />}
          {editingTodo ? "Save Changes" : "Add Task"}
        </button>

        {editingTodo && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-200 sm:w-auto"
          >
            <X size={18} />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;
