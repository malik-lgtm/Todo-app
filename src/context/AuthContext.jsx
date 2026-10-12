
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const USERS_KEY = "taskflow-demo-users";
const SESSION_KEY = "taskflow-demo-session";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function makeId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() =>
    readStorage(USERS_KEY, [])
  );

  const [user, setUser] = useState(() => {
    const session = readStorage(SESSION_KEY, null);
    const savedUsers = readStorage(USERS_KEY, []);

    if (!session?.id) return null;

    return savedUsers.find((item) => item.id === session.id) || null;
  });

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ id: user.id })
      );
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  const register = useCallback(
    ({ name, email, password }) => {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();

      const existingUsers = readStorage(USERS_KEY, []);

      if (existingUsers.some((item) => item.email === cleanEmail)) {
        return {
          success: false,
          message: "An account with this email already exists.",
        };
      }

      const newUser = {
        id: makeId(),
        name: cleanName,
        email: cleanEmail,
        // DEMO ONLY: never store real passwords like this in production.
        password,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...existingUsers, newUser];

      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setUser(newUser);

      return { success: true, user: newUser };
    },
    []
  );

  const login = useCallback(({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const savedUsers = readStorage(USERS_KEY, []);

    const foundUser = savedUsers.find(
      (item) =>
        item.email === cleanEmail &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password. Please try again.",
      };
    }

    setUsers(savedUsers);
    setUser(foundUser);

    return { success: true, user: foundUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
