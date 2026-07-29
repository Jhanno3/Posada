import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export default async function RoomsPage() {
  const supabase = await createClient();
  const { data: rooms } = await supabase
    .from("rooms")
    .select("*")
    .order("price_per_night", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Habitaciones</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms?.map((room) => (
          <Link key={room.id} href={`/habitaciones/${room.id}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <h2 className="text-lg font-semibold text-stone-900">{room.name}</h2>
              <p className="mt-2 text-sm text-stone-600">{room.description}</p>
              <p className="mt-4 font-medium text-amber-800">
                ${room.price_per_night} / noche
              </p>
            </Card>
          </Link>
        ))}

        {!rooms?.length && (
          <p className="text-stone-500">Todavía no hay habitaciones cargadas.</p>
        )}
      </div>
    </div>
  );
}
