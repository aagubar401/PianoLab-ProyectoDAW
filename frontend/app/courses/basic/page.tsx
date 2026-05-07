"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import CourseAccordion from "../../../components/CourseAccordion";
import UserVideoCard from "../../../components/UserVideoCard";
import Button from "../../../components/Button";
import { useState } from "react";

export default function BasicCoursePage() {
  const [showUpload, setShowUpload] = useState(false);

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
          <UserVideoCard
            title="Mi progreso en el ejercicio 1"
            author="demoUser"
            likes={10}
            dislikes={2}
          />
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
