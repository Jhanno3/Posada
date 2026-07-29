"use client";

import { useActionState } from "react";
import { createReservation } from "@/lib/actions/reservations";
import type { ActionState } from "@/lib/actions/auth";
import type { Room } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {};

export function NewReservationForm({
  rooms,
  defaultRoomId,
}: {
  rooms: Room[];
  defaultRoomId?: string;
}) {
  const [state, formAction, pending] = useActionState(createReservation, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="roomId">Habitación</Label>
        <select
          id="roomId"
          name="roomId"
          required
          defaultValue={defaultRoomId}
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
        >
          <option value="" disabled>
            Seleccioná una habitación
          </option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} · ${room.price_per_night}/noche
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="checkIn">Entrada</Label>
          <Input id="checkIn" name="checkIn" type="date" required />
        </div>
        <div>
          <Label htmlFor="checkOut">Salida</Label>
          <Input id="checkOut" name="checkOut" type="date" required />
        </div>
      </div>

      <div>
        <Label htmlFor="guests">Huéspedes</Label>
        <Input id="guests" name="guests" type="number" min={1} defaultValue={1} required />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Reservando..." : "Confirmar reserva"}
      </Button>
    </form>
  );
}
