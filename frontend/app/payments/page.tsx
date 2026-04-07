"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../lib/auth";
import Button from "../../components/Button";

export default function PaymentsPage() {
  const { user, setPlan } = useAuth();

  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-bold text-darkblue mb-6">
        Planes de pago
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Plan Básico */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800">Plan Básico</h2>
          <p className="text-sm text-gray-600 mt-2">
            Acceso al curso Piano Básico.
          </p>
          <p className="text-2xl font-bold text-darkblue mt-4">Gratis</p>

          {user?.plan === "BASIC" ? (
            <p className="mt-4 text-sm text-green-600 font-medium">
              ✔ Este es tu plan actual
            </p>
          ) : (
            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={() => setPlan("BASIC")}
            >
              Cambiar a Básico
            </Button>
          )}
        </div>

        {/* Plan Premium */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800">Plan Premium</h2>
          <p className="text-sm text-gray-600 mt-2">
            Acceso a todos los cursos.
          </p>
          <p className="text-2xl font-bold text-darkblue mt-4">30€</p>

          {user?.plan === "PREMIUM" ? (
            <p className="mt-4 text-sm text-green-600 font-medium">
              ✔ Este es tu plan actual
            </p>
          ) : (
            <Button
              className="mt-4 w-full"
              onClick={() => setPlan("PREMIUM")}
            >
              Comprar Premium
            </Button>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
