import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export async function AccountOverview() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user!.id)
    .single();

  const { count: reservationsCount } = await supabase
    .from("reservations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">
        Hola, {profile?.full_name ?? user?.email}
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-sm text-stone-500">Reservas totales</p>
          <p className="mt-1 text-2xl font-semibold text-stone-900">
            {reservationsCount ?? 0}
          </p>
        </Card>
      </div>
    </div>
  );
}
