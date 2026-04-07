"use client";

import Button from "../../../components/Button";
import { useRouter } from "next/navigation";

export default function Error403Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 max-w-md text-center">
        <h1 className="text-4xl font-bold text-darkblue mb-4">403</h1>
        <p className="text-gray-700 mb-6">
          No tienes acceso a este contenido.  
          Necesitas el plan Premium para ver esta página.
        </p>

        <Button className="w-full" onClick={() => router.push("/")}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
