
import { useCallback, useEffect, useState } from "react";

const LEGACY_KEY = "todo-app-tasks";
const MIGRATION_KEY = "taskflow-demo-tasks-migrated";

function readTodos(key) {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Could not read tasks from ${key}:`, error);
    return [];
  }
}

function createId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function useTodos(userId) {
  const storageKey = userId
    ? `taskflow-demo-tasks-${userId}`
    : null;

  const [todos, setTodos] = useState([]);
  const [loadedKey, setLoadedKey] = useState(null);

  // Load tasks whenever the signed-in user changes.
  useEffect(() => {
    if (!storageKey) {
      setTodos([]);
      setLoadedKey(null);
      return;
    }

    let savedTodos = readTodos(storageKey);

    try {
      const alreadyMigrated =
        localStorage.getItem(MIGRATION_KEY) === "true";

      if (!alreadyMigrated) {
        const legacyTodos = readTodos(LEGACY_KEY);

        // Copy old tasks to the first account if it has no saved tasks.
        if (savedTodos.length === 0 && legacyTodos.length > 0) {
          savedTodos = legacyTodos;

          localStorage.setItem(
            storageKey,
            JSON.stringify(savedTodos)
          );
        }

        localStorage.setItem(MIGRATION_KEY, "true");
      }
    } catch (error) {
      console.error("Could not migrate existing tasks:", error);
    }

    setTodos(savedTodos);
    setLoadedKey(storageKey);
  }, [storageKey]);

  // Save only after the correct account's tasks have loaded.
  useEffect(() => {
    if (!storageKey || loadedKey !== storageKey) {
      return;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(todos));
    } catch (error) {
      console.error("Could not save tasks:", error);
    }
  }, [storageKey, loadedKey, todos]);

  // Add a new task.
  const addTodo = useCallback((todoData) => {
    const newTodo = {
      id: createId(),
      title: todoData.title,
      description: todoData.description || "",
      completed: false,
      priority: todoData.priority || "Medium",
      dueDate: todoData.dueDate || "",
      createdAt: new Date().toISOString(),
    };

    setTodos((currentTodos) => [
      newTodo,
      ...currentTodos,
    ]);

    return newTodo;
  }, []);

  // Mark a task complete or incomplete.
  const toggleTodo = useCallback((id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  // Update a task's details.
  const updateTodo = useCallback((id, updates) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates }
          : todo
      )
    );
  }, []);

  // Delete a task.
  const deleteTodo = useCallback((id) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
}

export default useTodos;
