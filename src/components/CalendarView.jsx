
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CircleCheck,
  Clock3,
  Pencil,
} from "lucide-react";

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function CalendarView({ todos, onEditTask }) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(() =>
    toDateKey(new Date())
  );

  const todayKey = toDateKey(new Date());
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - mondayOffset);

  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index
    );

    return {
      date,
      key: toDateKey(date),
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
    };
  });

  const tasksByDate = todos.reduce((result, task) => {
    if (task.dueDate) {
      if (!result[task.dueDate]) result[task.dueDate] = [];
      result[task.dueDate].push(task);
    }

    return result;
  }, {});

  const selectedTasks = tasksByDate[selectedDate] || [];

  function changeMonth(amount) {
    setVisibleMonth((current) =>
      new Date(current.getFullYear(), current.getMonth() + amount, 1)
    );
  }

  function handleDateSelect(day) {
    setSelectedDate(day.key);

    if (!day.isCurrentMonth) {
      setVisibleMonth(
        new Date(day.date.getFullYear(), day.date.getMonth(), 1)
      );
    }
  }

  const selectedDateLabel = new Date(
    `${selectedDate}T12:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(250px,1fr)]">
      {/* Calendar grid */}
      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <CalendarDays size={20} />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900">
                Task Calendar
              </h2>
              <p className="text-xs text-slate-500">
                Your schedule at a glance
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900">
            {visibleMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>

          <button
            type="button"
            onClick={() => {
              const now = new Date();
              setVisibleMonth(
                new Date(now.getFullYear(), now.getMonth(), 1)
              );
              setSelectedDate(toDateKey(now));
            }}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50"
          >
            Today
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day) => (
              <div
                key={day}
                className="py-2 text-center text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs"
              >
                {day}
              </div>
            )
          )}

          {calendarDays.map((day) => {
            const dayTasks = tasksByDate[day.key] || [];
            const isSelected = day.key === selectedDate;
            const isToday = day.key === todayKey;

            return (
              <button
                key={day.key}
                type="button"
                onClick={() => handleDateSelect(day)}
                aria-pressed={isSelected}
                aria-label={`${day.key}, ${dayTasks.length} tasks`}
                className={`relative flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 rounded-lg py-1 text-xs transition sm:min-h-14 sm:text-sm ${
                  isSelected
                    ? "bg-blue-700 font-bold text-white"
                    : isToday
                      ? "bg-blue-50 font-bold text-blue-700"
                      : day.isCurrentMonth
                        ? "text-slate-700 hover:bg-slate-100"
                        : "text-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{day.day}</span>

                {dayTasks.length > 0 && (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSelected ? "bg-white" : "bg-blue-500"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-700" />
            Selected date
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
            Has tasks
          </span>
        </div>
      </section>

      {/* Tasks for selected date */}
      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Selected date
          </p>
          <h2 className="mt-1 break-words text-lg font-bold text-slate-900">
            {selectedDateLabel}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {selectedTasks.length}{" "}
            {selectedTasks.length === 1 ? "task" : "tasks"} scheduled
          </p>
        </div>

        {selectedTasks.length > 0 ? (
          <div className="space-y-3">
            {selectedTasks.map((task) => (
              <article
                key={task.id}
                className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200 p-3"
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    task.completed
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {task.completed ? (
                    <CircleCheck size={18} />
                  ) : (
                    <Clock3 size={18} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`break-words text-sm font-semibold ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {task.title}
                  </p>

                  <p className="mt-1 text-xs capitalize text-slate-500">
                    {task.completed ? "Completed" : "Pending"} ·{" "}
                    {task.priority || "low"} priority
                  </p>

                  <button
                    type="button"
                    onClick={() => onEditTask(task)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
                  >
                    <Pencil size={13} />
                    Edit task
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-slate-50 px-4 py-8 text-center">
            <CalendarDays
              size={28}
              className="mx-auto mb-3 text-slate-400"
            />
            <p className="text-sm font-semibold text-slate-700">
              No tasks for this date
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Tasks with this due date will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default CalendarView;
