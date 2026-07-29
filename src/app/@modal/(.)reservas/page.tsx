import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AccountModalShell } from "@/components/dashboard/account-modal-shell";
import { ReservationsList } from "@/components/dashboard/reservations-list";

export default async function ReservationsModal() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AccountModalShell>
      <ReservationsList />
    </AccountModalShell>
  );
}
