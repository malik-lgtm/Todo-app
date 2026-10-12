
import { LogOut, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
        {user.name?.charAt(0)?.toUpperCase() || <UserRound size={18} />}
      </div>

      <div className="hidden min-w-0 sm:block">
        <p className="max-w-36 truncate text-sm font-semibold text-slate-800">
          {user.name}
        </p>
        <p className="max-w-36 truncate text-xs text-slate-500">
          {user.email}
        </p>
      </div>

      <button
        type="button"
        onClick={logout}
        title="Log out"
        aria-label="Log out"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={19} />
      </button>
    </div>
  );
}

export default UserMenu;
