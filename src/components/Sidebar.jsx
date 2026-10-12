
import {
  CheckSquare,
  LayoutDashboard,
  ListTodo,
  Clock3,
  CircleCheck,
  Sun,
  Moon,
  Zap,
} from "lucide-react";

function Sidebar({ filter, setFilter, theme, toggleTheme }) {
  const isDark = theme === "dark";

  const navItems = [
    { label: "Dashboard", value: "Dashboard", icon: LayoutDashboard },
    { label: "All Tasks", value: "All", icon: ListTodo },
    { label: "Pending", value: "Pending", icon: Clock3 },
    { label: "Completed", value: "Completed", icon: CircleCheck },
  ];

  return (
    <aside className="flex w-full min-w-0 flex-col border-b border-slate-200 bg-white p-4 lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-5">
      <div className="mb-5 flex items-center justify-between gap-3 lg:mb-10 lg:justify-start">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
            <CheckSquare size={23} />
          </div>

          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              TASKFLOW
            </h2>
            <p className="text-xs text-slate-500">Your daily planner</p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </div>

      <p className="mb-3 hidden px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 lg:block">
        Workspace
      </p>

      <nav
        aria-label="Task navigation"
        className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.value === "Dashboard"
              ? filter === "All"
              : filter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setFilter(item.value === "Dashboard" ? "All" : item.value);
              }}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition lg:w-full ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.label}</span>

              {active && (
                <span className="ml-auto hidden h-5 w-1 rounded-full bg-blue-700 lg:block" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-5 hidden rounded-2xl bg-blue-50 p-4 lg:mt-auto lg:block">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
          <Zap size={19} />
        </div>
        <p className="text-sm font-bold text-slate-800">Stay on track</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Small steps every day lead to big results.
        </p>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="mt-5 hidden w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 lg:flex"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
        {isDark ? "Light mode" : "Dark mode"}
      </button>
    </aside>
  );
}

export default Sidebar;
