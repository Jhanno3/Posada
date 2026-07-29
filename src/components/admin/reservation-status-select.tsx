"use client";

import { updateReservationStatus } from "@/lib/actions/admin";
import type { ReservationStatus } from "@/types/database.types";

const statuses: ReservationStatus[] = [
  "pendiente",
  "confirmada",
  "cancelada",
  "completada",
];

export function ReservationStatusSelect({
  reservationId,
  status,
}: {
  reservationId: string;
  status: ReservationStatus;
}) {
  return (
    <select
      defaultValue={status}
      onChange={(e) =>
        updateReservationStatus(reservationId, e.target.value as ReservationStatus)
      }
      className="rounded-md border border-stone-300 bg-white px-2 py-1 text-sm text-stone-900"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
