"use client";

import { useRouter } from "next/navigation";

export function ModalCloseButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Cerrar"
      className="rounded-md p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
    >
      ✕
    </button>
  );
}
