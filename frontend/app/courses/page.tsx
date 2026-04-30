"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../lib/useAuth";
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

      <div className="flex flex-col md:flex-row justify-center items-start gap-6">
        {/* Curso básico (siempre visible) */}
        <a
          href="/courses/basic"
          className="flex-1 transition-transform duration-300 hover:scale-105"
        >
          <img
            src="/logo-basico.png"
            alt="Logo piano básico"
            className="w-full rounded-xl shadow-md hover:shadow-lg"
          />
        </a>

        {/* Si el usuario es premium → mostrar todos los cursos */}
        {user?.premium ? (
          <>
            <a
              href="/courses/accomp"
              className="flex-1 transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/logo-acompanamientos.png"
                alt="Logo piano acompañamientos"
                className="w-full rounded-xl shadow-md hover:shadow-lg"
              />
            </a>

            <a
              href="/courses/scores"
              className="flex-1 transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/logo-partituras.png"
                alt="Logo piano partituras"
                className="w-full rounded-xl shadow-md hover:shadow-lg"
              />
            </a>
          </>
        ) : (
          /* Si NO es premium → mensaje + botón */
          <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4 flex-1">
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
