
import { CheckCircle2, Circle, ListTodo, TrendingUp } from "lucide-react";

function TaskStats({ todos = [] }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      icon: ListTodo,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: Circle,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={21} />
                </div>
              </div>

              <h3 className="mt-4 text-3xl font-bold text-slate-900">
                {stat.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Completion Progress Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <TrendingUp size={21} />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Task Progress
              </h2>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              {total === 0
                ? "Add your first task to start tracking your progress."
                : progress === 100
                  ? "Amazing! You've completed all your tasks."
                  : "Keep going! Every completed task counts."}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-3xl font-bold text-blue-600">
              {progress}%
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {completed} of {total} tasks completed
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Task completion progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>0%</span>
          <span>{pending} remaining</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

export default TaskStats;
