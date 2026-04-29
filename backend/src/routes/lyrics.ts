import { Router } from "express";
import { Client } from "genius-lyrics";

const router = Router();
const client = new Client(process.env.GENIUS_API_KEY || "");

router.get("/", async (req, res) => {
  const artist = req.query.artist as string;
  const song = req.query.song as string;

  if (!artist || !song) {
    return res.status(400).json({
      error: "Debes enviar ?artist= y ?song=",
    });
  }

  try {
    // Buscar canción en Genius
    const results = await client.songs.search(`${artist} ${song}`);

    if (!results.length) {
      return res.json({
        song: null,
        artist: null,
        lyrics: null,
      });
    }

    const track = results[0];
    const lyrics = await track.lyrics();

    return res.json({
      song: track.title,
      artist: track.artist.name,
      lyrics,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error obteniendo letra" });
  }
});

export default router;
