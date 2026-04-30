import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User"; // 🔥 CORREGIDO

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      username,
      email,
      password: hashed,
    });

    return res.json({
      message: "Usuario creado",
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        premium: user.premium,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error en el registro" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login correcto",
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        premium: user.premium,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error en el login" });
  }
};

export const upgradeToPremium = async (req: Request, res: Response) => {
  try {


    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Falta userId" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.premium = true;
    await user.save();

    return res.json({
      message: "Usuario actualizado a Premium",
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        premium: user.premium,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al actualizar a Premium" });
  }
};
