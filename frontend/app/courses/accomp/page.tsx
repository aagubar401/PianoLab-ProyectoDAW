"use client";

import PremiumRoute from "../../../components/PremiumRoute";
import CourseAccordion from "../../../components/CourseAccordion";
import UserVideoCard from "../../../components/UserVideoCard";
import Button from "../../../components/Button";
import { useState } from "react";

export default function AccompCoursePage() {
  const [showUpload, setShowUpload] = useState(false);

  // Estados para letras
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // 🔥 FUNCIÓN PARA BUSCAR LETRAS
  const fetchLyrics = async () => {
    if (!artist || !song) {
      setError("Debes introducir artista y canción.");
      return;
    }

    setLoading(true);
    setError(null);
    setLyrics(null);

    try {
      const res = await fetch(
        `http://localhost:4000/lyrics?artist=${encodeURIComponent(
          artist
        )}&song=${encodeURIComponent(song)}`
      );

      const data = await res.json();

      if (!data.lyrics) {
        setError("No se encontró la letra.");
      } else {
        setLyrics(data.lyrics);
      }
    } catch {
      setError("Error al conectar con el servidor.");
    }

    setLoading(false);
  };

  return (
    <PremiumRoute>
      <h1 className="text-3xl font-bold text-darkblue mb-6">
        Curso Piano Acompañamientos
      </h1>

      <img
        src="/logo-acompanamientos.png"
        alt="Logo piano acompañamientos"
        className="w-full"
      />

      <CourseAccordion sections={sections} />

      {/* 🔥 BUSCADOR DE LETRAS */}
      <div className="mt-10 p-4 bg-white rounded-xl shadow-card border border-gray-100">
        <h2 className="text-xl font-semibold mb-3 text-darkblue">
          Buscar letra de canción
        </h2>

        <input
          type="text"
          placeholder="Artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
        />

        <input
          type="text"
          placeholder="Canción"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
        />

        <Button className="w-full" onClick={fetchLyrics}>
          Buscar letra
        </Button>

        {loading && <p className="mt-3 text-sm text-gray-600">Cargando...</p>}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        {lyrics && (
          <div className="mt-4 max-h-96 overflow-y-auto whitespace-pre-line bg-gray-50 p-4 rounded-lg border text-sm leading-relaxed">
            {lyrics}
          </div>
        )}
      </div>

      {/* SUBIR VIDEO */}
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
