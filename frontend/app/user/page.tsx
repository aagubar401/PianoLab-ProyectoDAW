"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../lib/useAuth";
import Button from "../../components/Button";

export default function UserPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-card border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-darkblue mb-4 flex items-center gap-2">
          Mi cuenta

          {/* ⭐ Badge Premium */}
          {user?.premium && (
            <span className="text-yellow-500 text-sm font-semibold flex items-center gap-1">
              ⭐ Premium
            </span>
          )}
        </h1>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Nombre:</strong> {user?.fullname}
          </p>

          <p className="flex items-center gap-2">
            <strong>Usuario:</strong> {user?.username}

            {/* Badge pequeño junto al username */}
            {user?.premium && (
              <span className="bg-yellow-400 text-black text-[10px] px-1.5 py-0.5 rounded-full shadow">
                ⭐
              </span>
            )}
          </p>

          <p>
            <strong>Correo:</strong> {user?.email}
          </p>

          <p>
            <strong>Plan de pago:</strong>{" "}
            {user?.premium ? (
              <span className="text-yellow-600 font-semibold">Premium</span>
            ) : (
              "Básico"
            )}
          </p>
        </div>

        <Button
          className="w-full mt-6"
          variant="secondary"
          onClick={logout}
        >
          Cerrar sesión
        </Button>
      </div>
    </ProtectedRoute>
  );
}
