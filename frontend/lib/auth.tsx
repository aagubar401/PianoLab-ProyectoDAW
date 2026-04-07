"use client";
import {User, Plan} from "./authTypes";
import { AuthContext } from "./AuthContext";
import {
  useEffect,
  useState,
  ReactNode,
} from "react";
type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  
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
  const [context, setContext] = useState({ user, loading, login, register, logout, setPlan })
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}


