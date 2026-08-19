"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SUPPORTER_STATUSES } from "../../db/supporters";
import { statusLabels } from "./Charts";

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [current, setCurrent] = useState(status);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

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
      {SUPPORTER_STATUSES.map((option) => (
        <option key={option} value={option}>{statusLabels[option] || option}</option>
      ))}
    </select>
  );
}
