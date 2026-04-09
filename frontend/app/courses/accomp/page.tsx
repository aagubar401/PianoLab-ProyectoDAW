"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import CourseAccordion from "../../../components/CourseAccordion";
import UserVideoCard from "../../../components/UserVideoCard";
import Button from "../../../components/Button";
import { useAuth } from "../../../lib/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccompCoursePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [showUpload, setShowUpload] = useState(false);

  if (user?.plan !== "PREMIUM") {
    router.replace("/error/403");
    return null;
  }

  const sections = [
    {
      id: "temario",
      title: "Temario (PDF)",
      content: (
        <a
          href="/pdfs/curso-acomp.pdf"
          target="_blank"
          className="text-primary underline"
        >
          Descargar PDF del curso
        </a>
      ),
    },
    {
      id: "videos",
      title: "Vídeos del curso",
      content: <p>Vídeos oficiales del curso (pendiente de añadir).</p>,
    },
    {
      id: "partituras",
      title: "Partituras",
      content: (
        <p className="text-sm text-gray-600">
          Este curso no tiene partituras incluidas.
        </p>
      ),
    },
    {
      id: "usuarios",
      title: "Vídeos de usuarios",
      content: (
        <UserVideoCard
          title="Acompañamiento básico"
          author="demoUser"
          likes={5}
          dislikes={1}
        />
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-bold text-darkblue mb-6">
        Curso Piano Acompañamientos
      </h1>

      <CourseAccordion sections={sections} />

      <Button
        className="mt-6"
        variant="secondary"
        onClick={() => setShowUpload(!showUpload)}
      >
        Publicar vídeo
      </Button>

      {showUpload && (
        <div className="mt-4 bg-white p-4 rounded-xl shadow-card border border-gray-100">
          <p className="text-sm text-gray-700 mb-2">Subir vídeo</p>
          <input type="file" accept="video/*" className="text-sm" />
          <input
            type="text"
            placeholder="Título del vídeo"
            className="mt-2 w-full border rounded-lg px-3 py-2 text-sm"
          />
          <Button className="mt-3 w-full">Subir</Button>
        </div>
      )}
    </ProtectedRoute>
  );
}
