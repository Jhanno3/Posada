import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AccountModalShell } from "@/components/dashboard/account-modal-shell";
import { ProfileSection } from "@/components/dashboard/profile-section";

export default async function ProfileModal() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AccountModalShell>
      <ProfileSection />
    </AccountModalShell>
  );
}
