import { RoomForm } from "@/components/admin/room-form";
import { createRoom } from "@/lib/actions/rooms";

export default function NewRoomPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">Nueva habitación</h1>
      <RoomForm action={createRoom} />
    </div>
  );
}
