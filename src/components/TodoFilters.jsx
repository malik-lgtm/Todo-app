
const filters = ["All", "Pending", "Completed"];

function TodoFilters({ filter, setFilter }) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setFilter(item)}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            filter === item
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default TodoFilters;
