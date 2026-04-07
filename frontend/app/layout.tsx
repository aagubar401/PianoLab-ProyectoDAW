import "./globals.css";
import { AuthProvider } from "../lib/auth";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "PianoLab",
  description: "Plataforma de cursos de piano",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
