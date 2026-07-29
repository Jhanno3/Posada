import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: room } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (!room) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900">{room.name}</h1>
      <p className="mt-4 text-stone-600">{room.description}</p>
      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-stone-500">Capacidad</dt>
          <dd className="font-medium text-stone-900">{room.capacity} personas</dd>
        </div>
        <div>
          <dt className="text-stone-500">Precio por noche</dt>
          <dd className="font-medium text-stone-900">${room.price_per_night}</dd>
        </div>
      </dl>

      <Link href={`/reservas/nueva?room=${room.id}`} className="mt-8 inline-block">
        <Button>Reservar</Button>
      </Link>
    </div>
  );
}
