import { createContext, useState, type ReactNode } from 'react';

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(u: string, p: string) {
    if (u === 'demo' && p === '123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}