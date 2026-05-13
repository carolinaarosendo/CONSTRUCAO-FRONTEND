import React, { useCallback, useMemo, useState, ReactNode } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { validateMockLogin } from '../../utils/validateMockLogin.js';

const STORAGE_KEY = "chronos-auth";

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem(STORAGE_KEY) === '1'
  );

  const login = useCallback((username: string, password: string) => {
    const ok = validateMockLogin(username, password);
    if (ok) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setIsAuthenticated(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(() => ({
    isAuthenticated, login, logout
  }), [isAuthenticated, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}