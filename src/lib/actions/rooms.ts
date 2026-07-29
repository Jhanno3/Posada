"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/auth";

function parseRoomForm(formData: FormData) {
  return {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    capacity: Number(formData.get("capacity")),
    price_per_night: Number(formData.get("pricePerNight")),
    total_units: Number(formData.get("totalUnits")),
    image_url: (formData.get("imageUrl") as string) || null,
  };
}

export async function createRoom(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from("rooms").insert(parseRoomForm(formData));

  if (error) {
    return { error: "No se pudo crear la habitación" };
  }

  revalidatePath("/admin/habitaciones");
  redirect("/admin/habitaciones");
}

export async function updateRoom(
  roomId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("rooms")
    .update(parseRoomForm(formData))
    .eq("id", roomId);

  if (error) {
    return { error: "No se pudo actualizar la habitación" };
  }

  revalidatePath("/admin/habitaciones");
  redirect("/admin/habitaciones");
}

export async function deleteRoom(roomId: string) {
  const supabase = await createClient();
  await supabase.from("rooms").delete().eq("id", roomId);
  revalidatePath("/admin/habitaciones");
}
