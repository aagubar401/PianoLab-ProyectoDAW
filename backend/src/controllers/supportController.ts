import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendSupportEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Configurar transporte (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pianolabsupport@gmail.com",
        pass: process.env.SUPPORT_EMAIL_PASSWORD, // 🔥 IMPORTANTE
      },
    });

    // Contenido del email
    const mailOptions = {
      from: `"PianoLab Soporte" <pianolabsupport@gmail.com>`,
      to: "pianolabsupport@gmail.com",
      subject: `Nueva consulta de soporte de ${name}`,
      text: `
Nombre: ${name}
Email: ${email}

Mensaje:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("PASS:", process.env.SUPPORT_EMAIL_PASSWORD);

    return res.json({ message: "Email enviado correctamente" });
  } catch (err) {
    console.error("Error enviando email:", err);
    return res.status(500).json({ error: "Error enviando el email" });
  }
};
