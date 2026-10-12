
import { Search, X } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  function handleClear() {
    setSearchTerm("");
  }

  return (
    <div className="w-full min-w-0">
      <label htmlFor="task-search" className="sr-only">
        Search tasks
      </label>

      <div className="flex min-h-11 w-full min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100 sm:px-4">
        <Search
          size={19}
          className="shrink-0 text-slate-400"
          aria-hidden="true"
        />

        <input
          id="task-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search tasks by title or description..."
          autoComplete="off"
          className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear task search"
            title="Clear search"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {searchTerm.trim() && (
        <p className="mt-2 text-xs text-slate-500">
          Searching for: <span className="font-medium">{searchTerm}</span>
        </p>
      )}
    </div>
  );
}

export default SearchBar;
