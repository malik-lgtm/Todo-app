
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./components/AuthPage";
import Home from "./pages/Home";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Home /> : <AuthPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
