
export function searchTodos(todos, searchTerm) {
  const query = searchTerm.trim().toLowerCase();

  if (!query) return todos;

  return todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(query) ||
      (todo.description || "").toLowerCase().includes(query)
  );
}

export function filterTodos(todos, filter) {
  switch (filter) {
    case "Pending":
      return todos.filter((todo) => !todo.completed);

    case "Completed":
      return todos.filter((todo) => todo.completed);

    default:
      return todos;
  }
}

export function sortTodos(todos, sortBy) {
  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
  };

  return [...todos].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        return (
          (priorityOrder[b.priority] || 1) -
          (priorityOrder[a.priority] || 1)
        );

      case "dueDate":
        // Tasks with no due date appear at the end.
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return a.dueDate.localeCompare(b.dueDate);

      case "newest":
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );

      case "oldest":
        return (
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
        );

      default:
        return 0;
    }
  });
}
