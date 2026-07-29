import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900">
          Bienvenido a Posada
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          Habitaciones cómodas en el corazón de la ciudad. Reservá tu estadía
          en pocos minutos.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/habitaciones">
            <Button>Ver habitaciones</Button>
          </Link>
          <Link href="/registro">
            <Button variant="secondary">Crear cuenta</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
