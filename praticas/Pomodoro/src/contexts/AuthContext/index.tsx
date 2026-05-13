import { useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthContextProvider');
  return ctx;
}

// Essa linha exporta o componente que criamos no passo anterior
export { AuthContextProvider } from './AuthContextProvider.jsx';