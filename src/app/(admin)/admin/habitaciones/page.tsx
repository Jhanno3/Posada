import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteRoom } from "@/lib/actions/rooms";

export default async function AdminRoomsPage() {
  const supabase = await createClient();
  const { data: rooms } = await supabase.from("rooms").select("*").order("name");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">Habitaciones</h1>
        <Link href="/admin/habitaciones/nueva">
          <Button>Nueva habitación</Button>
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {rooms?.map((room) => (
          <Card key={room.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-stone-900">{room.name}</p>
              <p className="text-sm text-stone-500">
                ${room.price_per_night}/noche · {room.capacity} personas ·{" "}
                {room.total_units} unidad(es)
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/habitaciones/${room.id}`}>
                <Button variant="secondary">Editar</Button>
              </Link>
              <form action={deleteRoom.bind(null, room.id)}>
                <Button type="submit" variant="danger">
                  Eliminar
                </Button>
              </form>
            </div>
          </Card>
        ))}

        {!rooms?.length && (
          <p className="text-stone-500">Todavía no hay habitaciones cargadas.</p>
        )}
      </div>
    </div>
  );
}
