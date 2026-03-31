"use client";

import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { useAuth } from "../lib/auth";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleCursosClick = () => {
    if (user) router.push("/courses");
    else router.push("/login");
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-darkblue">
          Bienvenido a <span className="text-primary">PianoLab</span>
        </h1>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          Aprende piano desde cero o mejora tu técnica con nuestros cursos
          estructurados: Piano Básico, Acompañamientos y Partituras. Accede a
          vídeos, apuntes en PDF y contenido creado por otros usuarios.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleCursosClick}>Ver cursos</Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/payments")}
          >
            Ver planes de pago
          </Button>
          <Button variant="ghost" onClick={() => router.push("/support")}>
            Atención al cliente
          </Button>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            ¿Qué encontrarás en PianoLab?
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>• Curso de Piano Básico con teoría y práctica.</li>
            <li>• Curso de Acompañamientos para tocar canciones.</li>
            <li>• Curso de Partituras para lectura musical.</li>
            <li>• PDFs descargables con apuntes y partituras.</li>
            <li>• Vídeos de otros usuarios con sistema de likes/dislikes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
