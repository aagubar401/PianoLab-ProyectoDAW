"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/error");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </>
  );
}
