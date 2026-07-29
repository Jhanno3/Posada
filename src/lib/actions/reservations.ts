"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/auth";

export async function createReservation(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const roomId = formData.get("roomId") as string;
  const checkIn = formData.get("checkIn") as string;
  const checkOut = formData.get("checkOut") as string;
  const guests = Number(formData.get("guests"));

  if (!roomId || !checkIn || !checkOut || !guests) {
    return { error: "Completá todos los campos" };
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    return { error: "La fecha de salida debe ser posterior a la de entrada" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: room } = await supabase
    .from("rooms")
    .select("price_per_night")
    .eq("id", roomId)
    .single();

  if (!room) {
    return { error: "La habitación seleccionada no existe" };
  }

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const { error } = await supabase.from("reservations").insert({
    user_id: user.id,
    room_id: roomId,
    check_in: checkIn,
    check_out: checkOut,
    guests,
    total_price: nights * room.price_per_night,
  });

  if (error) {
    return { error: "No se pudo crear la reserva" };
  }

  revalidatePath("/reservas");
  redirect("/reservas");
}

export async function cancelReservation(reservationId: string) {
  const supabase = await createClient();
  await supabase
    .from("reservations")
    .update({ status: "cancelada" })
    .eq("id", reservationId);

  revalidatePath("/reservas");
}
