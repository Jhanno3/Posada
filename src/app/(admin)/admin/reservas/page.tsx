import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { ReservationStatusSelect } from "@/components/admin/reservation-status-select";

export default async function AdminReservationsPage() {
  const supabase = await createClient();
  const { data: reservations } = await supabase
    .from("reservations")
    .select("*, rooms(name), profiles(full_name)")
    .order("check_in", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Reservas</h1>

      <div className="mt-6 space-y-4">
        {reservations?.map((reservation) => (
          <Card key={reservation.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-stone-900">
                {(reservation.rooms as unknown as { name: string })?.name} ·{" "}
                {(reservation.profiles as unknown as { full_name: string })?.full_name}
              </p>
              <p className="text-sm text-stone-500">
                {reservation.check_in} → {reservation.check_out} ·{" "}
                {reservation.guests} huésped(es) · ${reservation.total_price}
              </p>
            </div>
            <ReservationStatusSelect
              reservationId={reservation.id}
              status={reservation.status}
            />
          </Card>
        ))}

        {!reservations?.length && (
          <p className="text-stone-500">Todavía no hay reservas.</p>
        )}
      </div>
    </div>
  );
}
