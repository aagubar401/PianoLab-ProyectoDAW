"use client";

import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User, AuthContextType } from "./authTypes";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pianolab_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoadingUser(false);
  }, []);

  const persist = (u: User | null) => {
    if (u) localStorage.setItem("pianolab_user", JSON.stringify(u));
    else localStorage.removeItem("pianolab_user");
  };

  // 🔥 LOGIN REAL
  const login: AuthContextType["login"] = async ({ email, password }) => {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    const loggedUser: User = data.user;

    setUser(loggedUser);
    persist(loggedUser);
    localStorage.setItem("token", data.token);
  };

  // 🔥 REGISTER REAL
  const register: AuthContextType["register"] = async ({
    fullname,
    username,
    email,
    password,
  }) => {
    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
  };

  // 🔥 LOGOUT
  const logout = () => {
    setUser(null);
    persist(null);
    localStorage.removeItem("token");
  };

  const contextValue: AuthContextType = {
    user,
    loadingUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
