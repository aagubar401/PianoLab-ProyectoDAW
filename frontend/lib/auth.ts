"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Plan = "BASIC" | "PREMIUM";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  plan: Plan;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  setPlan: (plan: Plan) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pianolab_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    if (u) localStorage.setItem("pianolab_user", JSON.stringify(u));
    else localStorage.removeItem("pianolab_user");
  };

  const login = async ({ email }: { email: string; password: string }) => {
    const mockUser: User = {
      id: "1",
      name: "Usuario Demo",
      username: "demoUser",
      email,
      plan: "BASIC",
    };
    setUser(mockUser);
    persist(mockUser);
  };

  const register = async ({
    name,
    username,
    email,
  }: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    const mockUser: User = {
      id: "1",
      name,
      username,
      email,
      plan: "BASIC",
    };
    setUser(mockUser);
    persist(mockUser);
  };

  const logout = () => {
    setUser(null);
    persist(null);
  };

  const setPlan = (plan: Plan) => {
    if (!user) return;
    const updated = { ...user, plan };
    setUser(updated);
    persist(updated);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, setPlan }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
