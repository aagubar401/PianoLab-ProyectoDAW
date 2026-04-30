import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./database";
import "./models/User";
import lyricsRoute from "./routes/lyrics";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/lyrics", lyricsRoute);
app.use("/auth", authRoutes);

sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
  });
});
