import Link from "next/link";
import { SignOutButton } from "@/components/layout/sign-out-button";

const links = [
  { href: "/dashboard", label: "Resumen" },
  { href: "/reservas", label: "Mis reservas" },
  { href: "/perfil", label: "Mi perfil" },
];

export function ClientSidebar({ replace = false }: { replace?: boolean }) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-stone-200 bg-white p-4">
      <span className="mb-4 px-2 text-lg font-semibold text-stone-900">Posada</span>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            replace={replace}
            className="rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <SignOutButton />
    </aside>
  );
}
