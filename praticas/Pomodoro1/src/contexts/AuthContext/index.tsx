import { useContext } from 'react';
import { AuthContext, AuthContextProvider, type AuthContextType } from './AuthContext';

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthContextProvider');
  }
  return context;
}

export { AuthContextProvider };