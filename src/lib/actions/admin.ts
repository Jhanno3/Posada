"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ReservationStatus, UserRole } from "@/types/database.types";

export async function updateReservationStatus(
  reservationId: string,
  status: ReservationStatus,
) {
  const supabase = await createClient();
  await supabase.from("reservations").update({ status }).eq("id", reservationId);
  revalidatePath("/admin/reservas");
}

export async function updateUserRole(userId: string, role: UserRole) {
  const supabase = await createClient();
  await supabase.from("profiles").update({ role }).eq("id", userId);
  revalidatePath("/admin/usuarios");
}
