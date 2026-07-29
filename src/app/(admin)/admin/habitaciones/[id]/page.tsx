import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RoomForm } from "@/components/admin/room-form";
import { updateRoom } from "@/lib/actions/rooms";

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: room } = await supabase.from("rooms").select("*").eq("id", id).single();

  if (!room) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">Editar habitación</h1>
      <RoomForm room={room} action={updateRoom.bind(null, room.id)} />
    </div>
  );
}
