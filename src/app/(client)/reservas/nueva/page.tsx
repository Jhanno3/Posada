import { createClient } from "@/lib/supabase/server";
import { NewReservationForm } from "@/components/reservations/new-reservation-form";

export default async function NewReservationPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>;
}) {
  const { room } = await searchParams;
  const supabase = await createClient();
  const { data: rooms } = await supabase.from("rooms").select("*").order("name");

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-stone-900">Nueva reserva</h1>
      <NewReservationForm rooms={rooms ?? []} defaultRoomId={room} />
    </div>
  );
}
