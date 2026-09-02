"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MATERIAL_REQUEST_STATUSES, REGULAR_SUPPORTER_STATUSES } from "../../db/supporters";
import { statusLabels } from "./Charts";

export default function StatusSelect({ id, status, materialRequest = false }: { id: string; status: string; materialRequest?: boolean }) {
  const [current, setCurrent] = useState(status);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const options = materialRequest ? MATERIAL_REQUEST_STATUSES : REGULAR_SUPPORTER_STATUSES;

  async function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value;
    const previous = current;
    setCurrent(next);

    const response = await fetch("/api/admin/supporters/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });

    if (!response.ok) {
      setCurrent(previous);
      return;
    }

    startTransition(() => router.refresh());
  }

  return (
    <select className={`statusSelect statusSelect-${current}`} value={current} onChange={onChange} disabled={pending}>
      {options.map((option) => (
        <option key={option} value={option}>{statusLabels[option] || option}</option>
      ))}
    </select>
  );
}
