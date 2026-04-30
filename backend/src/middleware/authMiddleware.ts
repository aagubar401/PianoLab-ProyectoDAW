import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface TokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as TokenPayload;

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    // 🔥 Añadimos el usuario a la request
    (req as any).user = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      premium: user.premium,
    };

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
