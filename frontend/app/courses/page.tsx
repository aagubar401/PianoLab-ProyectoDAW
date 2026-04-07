"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../lib/auth";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-bold text-darkblue mb-6">
        Cursos disponibles
      </h1>

      <div className="space-y-4">
        {/* Curso básico */}
        <Button
          className="w-full"
          onClick={() => router.push("/courses/basic")}
        >
          Piano Básico
        </Button>

        {/* Cursos premium */}
        {user?.plan === "PREMIUM" ? (
          <>
            <Button
              className="w-full"
              onClick={() => router.push("/courses/accomp")}
            >
              Piano Acompañamientos
            </Button>

            <Button
              className="w-full"
              onClick={() => router.push("/courses/scores")}
            >
              Piano Partituras
            </Button>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4">
            <p className="text-sm text-gray-700 mb-3">
              Actualmente tienes el plan básico.  
              Para acceder al resto de cursos, actualiza tu plan.
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => router.push("/payments")}
            >
              Ir a planes de pago
            </Button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
