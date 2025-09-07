import React, { createContext, useState, useEffect } from 'react';

/**
 * Provides simple authentication for an admin user. Only the
 * hard‑coded credentials `admin`/`admin` are accepted. When logged
 * in, `isAdmin` becomes true and is persisted to localStorage. Other
 * components can use this context to conditionally render admin
 * controls (e.g. editing or deleting products).
 */
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('isAdmin') === 'true';
    } catch (err) {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('isAdmin', isAdmin.toString());
    } catch (err) {
      // ignore
    }
  }, [isAdmin]);
  function login(username, password) {
    if (username === 'admin' && password === 'admin') {
      setIsAdmin(true);
      return true;
    }
    return false;
  }
  function logout() {
    setIsAdmin(false);
  }
  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}