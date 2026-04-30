"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../lib/useAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loadingUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si ya terminó de cargar y no hay usuario → redirigir
    if (!loadingUser && !user) {
      router.replace("/login");
    }
  }, [user, loadingUser, router]);

  // Mientras carga el usuario o no existe aún → pantalla de carga
  if (loadingUser || !user) {
    return (
      <div className="w-full flex justify-center items-center py-20 text-gray-500">
        Cargando...
      </div>
    );
  }

  return <>{children}</>;
}
