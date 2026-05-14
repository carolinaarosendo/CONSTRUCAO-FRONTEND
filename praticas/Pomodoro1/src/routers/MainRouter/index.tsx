import { Routes, Route, Navigate } from 'react-router';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';
import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { useAuth } from '../../contexts/AuthContext'; // Mantenha apenas este!

// Componente para proteger as rotas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  // Se não estiver autenticado, manda para o Login ("/")
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

export function MainRouter() {
  return (
    <Routes>
      {/* Rota inicial: Login */}
      <Route path="/" element={<Login />} />

      {/* Rotas protegidas */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/about-pomodoro" 
        element={
          <ProtectedRoute>
            <AboutPomodoro />
          </ProtectedRoute>
        } 
      />

      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}