"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../lib/useAuth";
import Button from "../../components/Button";

export default function UserPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-card border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-darkblue mb-4">
          Mi cuenta
        </h1>

        <div className="space-y-3 text-sm text-gray-700">
          <p><strong>Nombre:</strong> {user?.name}</p>
          <p><strong>Usuario:</strong> {user?.username}</p>
          <p><strong>Correo:</strong> {user?.email}</p>
          <p>
            <strong>Plan de pago:</strong>{" "}
            {user?.plan === "BASIC" ? "Básico" : "Premium"}
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
