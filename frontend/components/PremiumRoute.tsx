"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../lib/useAuth";

export default function PremiumRoute({ children }: { children: ReactNode }) {
  const { user, loadingUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si ya terminó de cargar y no hay usuario → login
    if (!loadingUser && !user) {
      router.replace("/login");
      return;
    }

    // Si hay usuario pero NO es premium → página de upgrade
    if (!loadingUser && user && !user.premium) {
      router.replace("/payments");
    }
  }, [user, loadingUser, router]);

  // Mientras carga o no hay usuario → pantalla de carga
  if (loadingUser || !user) {
    return (
      <div className="w-full flex justify-center items-center py-20 text-gray-500">
        Cargando...
      </div>
    );
  }

  // Si no es premium, evitamos parpadeos
  if (!user.premium) {
    return null;
  }

  return <>{children}</>;
}
