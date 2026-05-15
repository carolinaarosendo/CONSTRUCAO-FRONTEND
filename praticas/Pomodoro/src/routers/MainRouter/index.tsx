import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router';

import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { NotFound } from '../../pages/NotFound';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { useAuth } from '../../contexts/AuthContext';

// 1. Componente para resetar o Scroll
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// 2. Componente de Proteção de Rota
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

// 3. O Roteador Principal
export function MainRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Ativado em todas as trocas de rota */}
      <Routes>
        {/* Rota Pública */}
        <Route path='/' element={<Login />} />

        {/* Rotas Protegidas */}
        <Route 
          path='/home' 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />
        <Route 
          path='/about-pomodoro/' 
          element={<ProtectedRoute><AboutPomodoro /></ProtectedRoute>} 
        />

        {/* Rota 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}