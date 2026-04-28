import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: "Falta parámetro q" });
  }

  try {
    // El usuario enviará algo como: "beatles - let it be"
    // Vamos a separar artista y canción automáticamente
    const [artist, song] = query.split(" - ").map((s) => s.trim());

    if (!artist || !song) {
      return res.status(400).json({
        error:
          "Formato incorrecto. Usa: ?q=ARTISTA - CANCION (ej: ?q=Beatles - Let It Be)",
      });
    }

    const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(
      artist
    )}/${encodeURIComponent(song)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.lyrics) {
      return res.json({
        song: null,
        artist: null,
        lyrics: null,
      });
    }

    return res.json({
      song,
      artist,
      lyrics: data.lyrics,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error obteniendo letra" });
  }
});

export default router;
