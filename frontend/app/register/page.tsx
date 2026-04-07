"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await register({ name, username, email, password });
      // El logo se enviará al backend en el futuro
      router.push("/courses");
    } catch {
      setError("Error al registrar el usuario. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <h1 className="text-2xl font-bold text-darkblue mb-2">
        Crear cuenta
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Regístrate para acceder a los cursos de PianoLab.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre y apellidos"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Nombre de usuario"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Input
          label="Repetir contraseña"
          type="password"
          required
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <div>
          <label className="text-sm font-medium text-gray-700">
            Logo de usuario (png o jpg)
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="mt-1 block w-full text-xs text-gray-600"
            onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creando cuenta..." : "Registrarse"}
        </Button>
      </form>

      <p className="mt-4 text-xs text-gray-600 text-center">
        ¿Ya tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-primary hover:underline"
        >
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
}
