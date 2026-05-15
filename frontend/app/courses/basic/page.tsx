"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import CourseAccordion from "../../../components/CourseAccordion";
import Button from "../../../components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BasicCoursePage() {
  const [showUpload, setShowUpload] = useState(false);
  const router = useRouter();
  const sections = [
    {
      id: "temario",
      title: "Teoría del curso (PDF)",
      content: (
        <a
          href="/courses/pdfs/basico_teoria.pdf"
          target="_blank"
          className="text-primary underline"
        >
          Ver teoría del curso (PDF)
        </a>
      ),
    },

    {
      id: "videos",
      title: "Vídeos del curso",
      content: (
        <div className="space-y-4">
          <video
            src="/courses/videos/basico/sentarse_al_piano_y_notas.mp4"
            controls
            className="w-full rounded-xl shadow"
          />

          <video
            src="/courses/videos/basico/cumpleanos_feliz.mp4"
            controls
            className="w-full rounded-xl shadow"
          />
        </div>
      ),
    },

    {
      id: "partituras",
      title: "Partituras del curso",
      content: (
        <div className="flex flex-col gap-2">
          <a
            href="/courses/pdfs/partituras/cumpleanos_feliz.pdf"
            target="_blank"
            className="text-primary underline"
          >
            Cumpleaños Feliz (PDF)
          </a>

          
        </div>
      ),
    },

    {
      id: "usuarios",
      title: "Vídeos de usuarios",
      content: (
        <div className="space-y-4">
          <p>Función no disponible todavía. Se añadirá en una futura actualización.</p>
        </div>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-bold text-darkblue mb-6">
        Curso Piano Básico
      </h1>

      <img
        src="/logo-basico.png"
        alt="Logo piano básico"
        className="w-full"
      />

      <CourseAccordion sections={sections} />
      <div className="mt-10 flex justify-center">
              <Button
                variant="secondary"
                className="px-6 py-2"
                onClick={() => router.push("/courses")}
              >
                Volver a cursos
              </Button>
      </div>
      
    </ProtectedRoute>
  );
}
