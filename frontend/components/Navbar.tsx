"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (path: string) =>
    pathname === path ? "text-darkblue font-semibold" : "text-gray-700";

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="font-semibold text-lg text-darkblue">
              PianoLab
            </span>
          </button>

          <div className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/support" className={isActive("/support")}>
              Atención al cliente
            </Link>
            <Link href="/payments" className={isActive("/payments")}>
              Pagos
            </Link>
            <Link href="/courses" className={isActive("/courses")}>
              Cursos
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => router.push("/user")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <div className="w-7 h-7 rounded-full bg-darkblue text-white flex items-center justify-center text-xs">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-800">{user.username}</span>
              </button>
              <button
                onClick={logout}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 rounded-full bg-darkblue text-white text-sm hover:bg-primary transition"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
