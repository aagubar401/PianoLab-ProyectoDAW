"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../lib/useAuth";
import Button from "../../components/Button";
import { upgradeUserToPremium } from "../../lib/api";

export default function PaymentsPage() {
  const { user } = useAuth();

  const handleUpgrade = async () => {
    if (!user) return;

    const res = await upgradeUserToPremium(Number(user.id)); // 🔥 FIX

    localStorage.setItem("pianolab_user", JSON.stringify(res.user));
    window.location.reload();
  };

  const handleDowngrade = () => {
    if (!user) return;

    const updatedUser = { ...user, premium: false };
    localStorage.setItem("pianolab_user", JSON.stringify(updatedUser));
    window.location.reload();
  };

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

          {user?.premium === false ? (
            <p className="mt-4 text-sm text-green-600 font-medium">
              ✔ Este es tu plan actual
            </p>
          ) : (
            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={handleDowngrade}
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

          {user?.premium === true ? (
            <p className="mt-4 text-sm text-green-600 font-medium">
              ✔ Este es tu plan actual
            </p>
          ) : (
            <Button
              className="mt-4 w-full"
              onClick={handleUpgrade}
            >
              Comprar Premium
            </Button>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
