import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./database";
import "./models/User";
import lyricsRoute from "./routes/lyrics";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/lyrics", lyricsRoute);

sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
  });
});
