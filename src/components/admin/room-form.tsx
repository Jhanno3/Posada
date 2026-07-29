"use client";

import { useActionState } from "react";
import type { ActionState } from "@/lib/actions/auth";
import type { Room } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {};

export function RoomForm({
  room,
  action,
}: {
  room?: Room;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" defaultValue={room?.name} required />
      </div>
      <div>
        <Label htmlFor="description">Descripción</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={room?.description ?? ""}
          rows={3}
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="capacity">Capacidad</Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            min={1}
            defaultValue={room?.capacity ?? 2}
            required
          />
        </div>
        <div>
          <Label htmlFor="pricePerNight">Precio/noche</Label>
          <Input
            id="pricePerNight"
            name="pricePerNight"
            type="number"
            min={0}
            step="0.01"
            defaultValue={room?.price_per_night}
            required
          />
        </div>
        <div>
          <Label htmlFor="totalUnits">Unidades</Label>
          <Input
            id="totalUnits"
            name="totalUnits"
            type="number"
            min={1}
            defaultValue={room?.total_units ?? 1}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="imageUrl">URL de imagen</Label>
        <Input id="imageUrl" name="imageUrl" defaultValue={room?.image_url ?? ""} />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
