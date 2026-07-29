import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { UserRoleSelect } from "@/components/admin/user-role-select";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Usuarios</h1>

      <div className="mt-6 space-y-4">
        {profiles?.map((profile) => (
          <Card key={profile.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-stone-900">
                {profile.full_name ?? "Sin nombre"}
              </p>
              <p className="text-sm text-stone-500">{profile.phone ?? "Sin teléfono"}</p>
            </div>
            <UserRoleSelect userId={profile.id} role={profile.role} />
          </Card>
        ))}

        {!profiles?.length && <p className="text-stone-500">No hay usuarios.</p>}
      </div>
    </div>
  );
}
