import Link from "next/link";
import { SignOutButton } from "@/components/layout/sign-out-button";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/habitaciones", label: "Habitaciones" },
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/usuarios", label: "Usuarios" },
];

export function AdminSidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-stone-200 bg-stone-900 p-4 text-stone-100">
      <span className="mb-4 px-2 text-lg font-semibold">Posada Admin</span>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm text-stone-200 hover:bg-stone-800"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <SignOutButton />
    </aside>
  );
}
