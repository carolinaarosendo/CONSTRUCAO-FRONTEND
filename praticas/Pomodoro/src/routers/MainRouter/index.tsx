import { Routes, Route, Navigate } from 'react-router';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';
import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { useAuth } from '../../contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Rotas protegidas */}
      <Route 
        path="/home" 
        element={<ProtectedRoute><Home /></ProtectedRoute>} 
      />
      <Route 
        path="/about-pomodoro" 
        element={<ProtectedRoute><AboutPomodoro /></ProtectedRoute>} 
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}