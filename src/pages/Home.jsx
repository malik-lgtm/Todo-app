
import { useAuth } from "../context/AuthContext";
import UserMenu from "../components/UserMenu";

import { useCallback, useState } from "react";
import {
  Search,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodo,
  Target,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import TodoForm from "../components/TodoForm";
import SearchBar from "../components/SearchBar";
import TodoFilters from "../components/TodoFilters";
import TaskStats from "../components/TaskStats";
import TodoList from "../components/TodoList";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import Toast from "../components/Toast";
import CalendarView from "../components/CalendarView";

import useTodos from "../hooks/useTodos";
import useTheme from "../hooks/useTheme";

import {
  searchTodos,
  filterTodos,
  sortTodos,
} from "../utils/todoHelpers";

function Home() {
  const {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [editingTodo, setEditingTodo] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [viewMode, setViewMode] = useState("tasks");
  const [toast, setToast] = useState(null);

  const dismissToast = useCallback((toastId) => {
    setToast((current) =>
      current?.id === toastId ? null : current
    );
  }, []);

  function showNotification(title, message, type = "success") {
    setToast({
      id: crypto.randomUUID(),
      title,
      message,
      type,
    });
  }

  const totalTasks = todos.length;
  const completedTasks = todos.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const searchedTodos = searchTodos(todos, searchTerm);
  const filteredTodos = filterTodos(searchedTodos, filter);
  const visibleTodos = sortTodos(filteredTodos, sortBy);

  const dateLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const upcomingTasks = todos
    .filter((task) => !task.completed && task.dueDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  function handleSubmitTask(taskData) {
    const taskTitle = taskData.title.trim();

    if (editingTodo) {
      updateTodo(editingTodo.id, taskData);
      showNotification(
        "Task updated",
        `"${taskTitle}" has been updated.`
      );
      setEditingTodo(null);
    } else {
      addTodo(taskData);
      showNotification(
        "Task added",
        `"${taskTitle}" was added successfully.`
      );
    }

    setShowTaskForm(false);
  }

  function handleToggleTask(taskId) {
    const task = todos.find((item) => item.id === taskId);
    if (!task) return;

    toggleTodo(taskId);

    showNotification(
      task.completed ? "Task reopened" : "Task completed",
      `"${task.title}" ${
        task.completed
          ? "has been marked as pending."
          : "has been marked as completed."
      }`
    );
  }

  function handleEditTask(task) {
    setEditingTodo(task);
    setShowTaskForm(true);

    window.setTimeout(() => {
      document.getElementById("task-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  function handleCancelForm() {
    setEditingTodo(null);
    setShowTaskForm(false);
  }

  function handleRequestDelete(taskId) {
    const task = todos.find((item) => item.id === taskId);
    if (task) setTaskToDelete(task);
  }

  function handleConfirmDelete() {
    if (!taskToDelete) return;

    const idToDelete = taskToDelete.id;
    const deletedTitle = taskToDelete.title;

    deleteTodo(idToDelete);

    if (editingTodo?.id === idToDelete) {
      setEditingTodo(null);
      setShowTaskForm(false);
    }

    setTaskToDelete(null);

    showNotification(
      "Task deleted",
      `"${deletedTitle}" was deleted.`
    );
  }

  return (
    <div
      className={`min-h-screen overflow-x-clip transition-colors duration-300 ${
        isDark ? "dark-theme" : "bg-slate-100"
      }`}
    >
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 xl:p-8">
          <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-1 text-sm text-slate-500">{dateLabel}</p>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Hello, welcome back!
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Here's what's happening with your tasks today.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("task-search")?.focus()
                }
                aria-label="Focus task search"
                title="Search tasks"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              >
                <Search size={19} />
              </button>

              <div
                title={`${pendingTasks} pending tasks`}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
              >
                <Bell size={19} />
                {pendingTasks > 0 && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                )}
              </div>

              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  T
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    My Workspace
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Personal planner
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid min-w-0 grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_280px]">
            <section className="min-w-0 space-y-6">
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-slate-900">
                    Statistics
                  </h2>
                  <span className="text-xs text-slate-500">
                    All your tasks
                  </span>
                </div>
                <TaskStats todos={todos} />
              </div>

              <section
                id="task-form"
                className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {editingTodo ? "Edit your task" : "Create a task"}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {editingTodo
                        ? "Make changes to your task."
                        : "Add something you want to accomplish."}
                    </p>
                  </div>

                  {!showTaskForm && !editingTodo && (
                    <button
                      type="button"
                      onClick={() => setShowTaskForm(true)}
                      className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                    >
                      + Add task
                    </button>
                  )}
                </div>

                {(showTaskForm || editingTodo) && (
                  <TodoForm
                    onSubmitTask={handleSubmitTask}
                    editingTodo={editingTodo}
                    onCancelEdit={handleCancelForm}
                  />
                )}
              </section>

              <section className="min-w-0">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {viewMode === "calendar" ? "Task Calendar" : "My Tasks"}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {viewMode === "calendar"
                        ? "View tasks by their due dates."
                        : `${visibleTodos.length} ${
                            visibleTodos.length === 1 ? "task" : "tasks"
                          } shown`}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setViewMode("tasks")}
                      aria-pressed={viewMode === "tasks"}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        viewMode === "tasks"
                          ? "bg-blue-700 text-white"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <ListTodo size={16} />
                      Tasks
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode("calendar")}
                      aria-pressed={viewMode === "calendar"}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        viewMode === "calendar"
                          ? "bg-blue-700 text-white"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <CalendarDays size={16} />
                      Calendar
                    </button>
                  </div>
                </div>

                {viewMode === "calendar" ? (
                  <CalendarView
                    todos={todos}
                    onEditTask={handleEditTask}
                  />
                ) : (
                  <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <LayoutDashboard
                          size={18}
                          className="text-blue-700"
                        />
                        <span className="text-sm font-semibold text-slate-800">
                          Manage tasks
                        </span>
                      </div>

                      <div className="flex min-w-0 items-center gap-2">
                        <label
                          htmlFor="sort-tasks"
                          className="text-xs font-medium text-slate-500"
                        >
                          Sort
                        </label>
                        <select
                          id="sort-tasks"
                          value={sortBy}
                          onChange={(event) => setSortBy(event.target.value)}
                          className="max-w-40 rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
                        >
                          <option value="newest">Newest first</option>
                          <option value="oldest">Oldest first</option>
                          <option value="priority">Priority</option>
                          <option value="dueDate">Due date</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                      />
                    </div>

                    <div className="mb-5">
                      <TodoFilters
                        filter={filter}
                        setFilter={setFilter}
                      />
                    </div>

                    <TodoList
                      tasks={visibleTodos}
                      onToggle={handleToggleTask}
                      onEdit={handleEditTask}
                      onDelete={handleRequestDelete}
                    />
                  </div>
                )}
              </section>
            </section>

            {/* Right dashboard panel */}
            <aside className="min-w-0 space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-2">
                  <h2 className="text-sm font-bold text-slate-900">
                    Overall Progress
                  </h2>
                  <Target size={18} className="text-blue-700" />
                </div>

                <div className="mx-auto flex max-w-[220px] justify-center">
                  <div
                    className="relative grid aspect-square w-full place-items-center rounded-full"
                    style={{
                      background: `conic-gradient(#3157d5 ${completionRate}%, #e8edf5 ${completionRate}% 100%)`,
                    }}
                    role="img"
                    aria-label={`${completionRate}% of tasks completed`}
                  >
                    <div className="grid h-[82%] w-[82%] place-content-center rounded-full bg-white text-center">
                      <span className="text-3xl font-extrabold tracking-tight text-blue-700">
                        {completionRate}%
                      </span>
                      <span className="mt-1 text-xs text-slate-500">
                        Tasks finished
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                      Completed
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {completedTasks}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      Pending
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {pendingTasks}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>

                  <p className="text-center text-xs leading-5 text-slate-500">
                    {totalTasks === 0
                      ? "Add your first task to start tracking progress."
                      : completedTasks === totalTasks
                        ? "Amazing! All your tasks are complete."
                        : `${pendingTasks} ${
                            pendingTasks === 1 ? "task remains" : "tasks remain"
                          } to complete.`}
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-bold text-slate-900">
                  Task Overview
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-700">
                      <ListTodo size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-500">Total tasks</p>
                      <p className="text-lg font-bold text-slate-900">
                        {totalTasks}
                      </p>
                    </div>
                    <ArrowUpRight size={17} className="text-blue-700" />
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-amber-600">
                      <Clock3 size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-500">Pending</p>
                      <p className="text-lg font-bold text-slate-900">
                        {pendingTasks}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-600">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-500">Finished</p>
                      <p className="text-lg font-bold text-slate-900">
                        {completedTasks}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarDays size={18} className="text-blue-700" />
                  <h2 className="text-sm font-bold text-slate-900">
                    Upcoming Tasks
                  </h2>
                </div>

                {upcomingTasks.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => handleEditTask(task)}
                        className="flex w-full min-w-0 items-start gap-3 rounded-lg text-left"
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                          <CalendarDays size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="break-words text-sm font-semibold text-slate-800">
                            {task.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Due {task.dueDate}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-3 text-center">
                    <CalendarDays
                      size={25}
                      className="mx-auto mb-2 text-slate-400"
                    />
                    <p className="text-sm font-medium text-slate-700">
                      Nothing scheduled
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Add a due date to a task to see it here.
                    </p>
                  </div>
                )}
              </section>
            </aside>
          </div>

          <footer className="py-3 text-center text-xs text-slate-400">
            TaskFlow · Make every day count.
          </footer>
        </main>
      </div>

      <DeleteConfirmModal
        task={taskToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />

      <Toast
        toast={toast}
        onClose={dismissToast}
        isDark={isDark}
      />
    </div>
  );
}

export default Home;
