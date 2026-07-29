import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cancelReservation } from "@/lib/actions/reservations";

export async function ReservationsList() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: reservations } = await supabase
    .from("reservations")
    .select("*, rooms(name, price_per_night)")
    .eq("user_id", user!.id)
    .order("check_in", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">Mis reservas</h1>
        <Link href="/habitaciones">
          <Button>Nueva reserva</Button>
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {reservations?.map((reservation) => (
          <Card key={reservation.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-stone-900">
                {(reservation.rooms as unknown as { name: string })?.name}
              </p>
              <p className="text-sm text-stone-500">
                {reservation.check_in} → {reservation.check_out} ·{" "}
                {reservation.guests} huésped(es)
              </p>
              <p className="text-sm capitalize text-stone-500">
                Estado: {reservation.status}
              </p>
            </div>

            {reservation.status === "pendiente" && (
              <form action={cancelReservation.bind(null, reservation.id)}>
                <Button type="submit" variant="danger">
                  Cancelar
                </Button>
              </form>
            )}
          </Card>
        ))}

        {!reservations?.length && (
          <p className="text-stone-500">Todavía no tenés reservas.</p>
        )}
      </div>
    </div>
  );
}
