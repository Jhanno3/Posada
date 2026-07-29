import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AccountModalShell } from "@/components/dashboard/account-modal-shell";
import { AccountOverview } from "@/components/dashboard/account-overview";

export default async function DashboardModal() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AccountModalShell>
      <AccountOverview />
    </AccountModalShell>
  );
}
