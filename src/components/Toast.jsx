
import { useEffect } from "react";
import { CheckCircle2, X, AlertCircle } from "lucide-react";

function Toast({ toast, onClose, isDark }) {
  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => {
      onClose(toast.id);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [toast?.id, onClose]);

  if (!toast) return null;

  const isError = toast.type === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;

  return (
    <div
      className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm"
      role="status"
      aria-live="polite"
    >
      <div
        className={`flex items-start gap-3 rounded-2xl border p-4 shadow-xl ${
          isDark
            ? "border-slate-700 bg-slate-800 text-slate-100"
            : "border-slate-200 bg-white text-slate-800"
        }`}
      >
        <Icon
          size={22}
          className={`mt-0.5 shrink-0 ${
            isError ? "text-red-500" : "text-emerald-500"
          }`}
        />

        <div className="min-w-0 flex-1">
          <p className="font-semibold">{toast.title}</p>
          {toast.message && (
            <p
              className={`mt-1 break-words text-sm ${
                isDark ? "text-slate-300" : "text-slate-500"
              }`}
            >
              {toast.message}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onClose(toast.id)}
          aria-label="Dismiss notification"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            isDark
              ? "text-slate-400 hover:bg-slate-700"
              : "text-slate-400 hover:bg-slate-100"
          }`}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
