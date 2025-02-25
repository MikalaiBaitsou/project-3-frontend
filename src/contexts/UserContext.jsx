// src/contexts/UserContext.jsx
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1])).payload;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  useEffect(() => {
    window.addEventListener('storage', () => setUser(getUserFromToken()));
    return () => window.removeEventListener('storage', () => setUser(getUserFromToken()));
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export { UserContext };

