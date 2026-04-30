"use client";

import PremiumRoute from "../../../components/PremiumRoute";
import CourseAccordion from "../../../components/CourseAccordion";
import UserVideoCard from "../../../components/UserVideoCard";
import Button from "../../../components/Button";
import { useState } from "react";

export default function ScoresCoursePage() {
  const [showUpload, setShowUpload] = useState(false);

  const sections = [
    {
      id: "temario",
      title: "Temario (PDF)",
      content: (
        <a
          href="/pdfs/curso-partituras.pdf"
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
        <a
          href="/pdfs/partituras-partituras.pdf"
          target="_blank"
          className="text-primary underline"
        >
          Descargar partituras
        </a>
      ),
    },
    {
      id: "usuarios",
      title: "Vídeos de usuarios",
      content: (
        <UserVideoCard
          title="Mi interpretación"
          author="demoUser"
          likes={12}
          dislikes={0}
        />
      ),
    },
  ];

  return (
    <PremiumRoute>
      <h1 className="text-3xl font-bold text-darkblue mb-6">
        Curso Piano Partituras
      </h1>

      <img
        src="/logo-partituras.png"
        alt="Logo piano partituras"
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
    </PremiumRoute>
  );
}
