import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: roomsCount }, { count: reservationsCount }, { count: usersCount }] =
    await Promise.all([
      supabase.from("rooms").select("*", { count: "exact", head: true }),
      supabase.from("reservations").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Panel de administración</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-stone-500">Habitaciones</p>
          <p className="mt-1 text-2xl font-semibold text-stone-900">{roomsCount ?? 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-stone-500">Reservas</p>
          <p className="mt-1 text-2xl font-semibold text-stone-900">
            {reservationsCount ?? 0}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-stone-500">Usuarios</p>
          <p className="mt-1 text-2xl font-semibold text-stone-900">{usersCount ?? 0}</p>
        </Card>
      </div>
    </div>
  );
}
