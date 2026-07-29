import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile/profile-form";

export async function ProfileSection() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">Mi perfil</h1>
      <ProfileForm
        defaultFullName={profile?.full_name ?? null}
        defaultPhone={profile?.phone ?? null}
        email={user?.email}
      />
    </div>
  );
}
