import { Routes, Route } from 'react-router-dom';
import { Login } from '../../pages/Login/index.jsx';
import { Home } from '../../pages/Home/index.js';
import { ProtectedRoute } from '../../components/ProtectedRoute/index.jsx';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}