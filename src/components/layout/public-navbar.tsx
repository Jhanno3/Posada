import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/habitaciones", label: "Habitaciones" },
  { href: "/contacto", label: "Contacto" },
];

export async function PublicNavbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-stone-900">
          Posada
        </Link>

        <div className="hidden gap-6 text-sm text-stone-600 sm:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-amber-800">
              {link.label}
            </Link>
          ))}
        </div>

        {user ? (
          <Link href="/dashboard">
            <Button variant="secondary">Mi cuenta</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button>Ingresar</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
