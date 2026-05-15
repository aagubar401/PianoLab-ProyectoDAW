"use client";

import PremiumRoute from "../../../components/PremiumRoute";
import CourseAccordion from "../../../components/CourseAccordion";
import Button from "../../../components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScoresCoursePage() {
  const [showUpload, setShowUpload] = useState(false);
  const router = useRouter();
  const sections = [
    {
      id: "temario",
      title: "Teoría del curso (PDF)",
      content: (
        <a
          href="/courses/pdfs/partituras_teoria.pdf"
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
            src="/courses/videos/partituras/compases.mp4"
            controls
            className="w-full rounded-xl shadow"
          />

          <video
            src="/courses/videos/partituras/curso_musescore.mp4"
            controls
            className="w-full rounded-xl shadow"
          />

          <video
            src="/courses/videos/partituras/identificar_notas.mp4"
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
            href="/courses/pdfs/partituras/himno_a_la_alegria.pdf"
            target="_blank"
            className="text-primary underline"
          >
            Himno a la Alegría (PDF)
          </a>

          <a
            href="/courses/pdfs/partituras/himno_a_la_alegria_con_acordes.pdf"
            target="_blank"
            className="text-primary underline"
          >
            Himno a la Alegría (con acordes) (PDF)
          </a>

          <a
            href="/courses/pdfs/partituras/nuvole_bianche.pdf"
            target="_blank"
            className="text-primary underline"
          >
            Nuvole Bianche (PDF)
          </a>
        </div>
      ),
    },

    {
      id: "usuarios",
      title: "Vídeos de usuarios",
      content: <div className="space-y-4">
          <p>Función no disponible todavía. Se añadirá en una futura actualización.</p>
        </div>
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
      <div className="mt-10 flex justify-center">
        <Button
          variant="secondary"
          className="px-6 py-2"
          onClick={() => router.push("/courses")}
        >
          Volver a cursos
        </Button>
      </div>
      
    </PremiumRoute>
  );
}
