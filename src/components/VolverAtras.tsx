"use client";

import { useRouter } from "next/navigation";

export default function VolverAtras() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:underline"
    >
      ← Volver
    </button>
  );
}