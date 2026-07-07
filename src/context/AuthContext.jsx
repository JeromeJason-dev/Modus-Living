import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "fieldStock_user_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  // Demo-only auth: any well-formed email/password combination succeeds.
  // Swap this out for a real API call when you connect a backend.
  const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const nextUser = { email, name: email.split("@")[0] };
    setUser(nextUser);
    return nextUser;
  };

  const logout = () => setUser(null);

  const value = { user, isAuthenticated: Boolean(user), login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
