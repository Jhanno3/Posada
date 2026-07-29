"use client";

import { updateUserRole } from "@/lib/actions/admin";
import type { UserRole } from "@/types/database.types";

export function UserRoleSelect({
  userId,
  role,
}: {
  userId: string;
  role: UserRole;
}) {
  return (
    <select
      defaultValue={role}
      onChange={(e) => updateUserRole(userId, e.target.value as UserRole)}
      className="rounded-md border border-stone-300 bg-white px-2 py-1 text-sm text-stone-900"
    >
      <option value="client">client</option>
      <option value="admin">admin</option>
    </select>
  );
}
