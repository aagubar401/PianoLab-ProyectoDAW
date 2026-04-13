"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../lib/useAuth";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path ? "text-darkblue font-semibold" : "text-gray-700";

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
        >


            
            <img src="/logo.png" alt="Logo PianoLab" className="h-20"/>


        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
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

        {/* Desktop user section */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => router.push("/user")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <div className="w-7 h-7 rounded-full bg-darkblue text-black flex items-center justify-center text-xs">
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
              className="px-4 py-2 rounded-full bg-darkblue text-black text-sm hover:bg-primary transition"
            >
              Iniciar sesión
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >

            <img src="/icons8-menu.svg" alt="hamburger" className="w-10 h-10"/>


        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          <Link
            href="/support"
            className={`block ${isActive("/support")}`}
            onClick={() => setOpen(false)}
          >
            Atención al cliente
          </Link>

          <Link
            href="/payments"
            className={`block ${isActive("/payments")}`}
            onClick={() => setOpen(false)}
          >
            Pagos
          </Link>

          <Link
            href="/courses"
            className={`block ${isActive("/courses")}`}
            onClick={() => setOpen(false)}
          >
            Cursos
          </Link>

          <div className="border-t border-gray-200 pt-3">
            {user ? (
              <>
                <button
                  onClick={() => {
                    router.push("/user");
                    setOpen(false);
                  }}
                  className="block w-full text-left text-gray-800 py-1"
                >
                  Mi cuenta
                </button>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="block w-full text-left text-gray-500 py-1"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  router.push("/login");
                  setOpen(false);
                }}
                className="block w-full text-left text-darkblue py-1"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
