import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext.jsx';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthContextProvider');
  }
  return context;
};