"use client";

import { FormEvent, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { sendSupportMessage } from "../../lib/api";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setSent(false);

  const payload = { name, email, message };

  try {
    await sendSupportMessage(payload);
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  } catch (err) {
    console.error("Error enviando soporte:", err);
    alert("Hubo un error enviando tu mensaje.");
  }
};

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <h1 className="text-2xl font-bold text-darkblue mb-2">
        Atención al cliente
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Envíanos tu consulta y te responderemos lo antes posible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre y apellidos"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Correo electrónico"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Mensaje
          </label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <Button type="submit" className="w-full">
          Enviar mensaje
        </Button>

        {sent && (
          <p className="text-xs text-green-600 mt-2">
            Tu mensaje ha sido enviado (simulado). Se ha enviado un objeto
            al backend con los datos del formulario.
          </p>
        )}
      </form>
    </div>
  );
}
