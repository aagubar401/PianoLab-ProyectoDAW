"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../lib/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      router.push("/courses");
    } catch {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <h1 className="text-2xl font-bold text-darkblue mb-2">
        Iniciar sesión
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Accede a tus cursos y contenido personalizado.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Correo electrónico"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Contraseña"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Entrar"}
        </Button>
      </form>

      <p className="mt-4 text-xs text-gray-600 text-center">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="text-primary hover:underline"
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
}
