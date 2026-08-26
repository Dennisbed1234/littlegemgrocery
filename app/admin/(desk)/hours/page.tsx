"use client";

import { FormEvent, useEffect, useState } from "react";

type HoursRow = { day: string; open: string; close: string };

export default function HoursPage() {
  const [hours, setHours] = useState<HoursRow[]>([]);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    fetch("/api/admin/hours")
      .then((response) => response.json())
      .then((data) => setHours(data.hours ?? []));
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/hours", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hours }),
    });
    if (response.ok) setSaved("Hours updated. The public storefront API will use these times.");
  }

  return (
    <>
      <header className="desk-header">
        <div>
          <p className="eyebrow">Pacific time</p>
          <h1>Weekly hours</h1>
        </div>
      </header>
      <form className="card hours-edit" onSubmit={onSubmit}>
        {hours.map((row, index) => (
          <label key={row.day}>
            <strong>{row.day}</strong>
            <input
              type="time"
              value={row.open}
              onChange={(event) => {
                const next = [...hours];
                next[index] = { ...row, open: event.target.value };
                setHours(next);
              }}
            />
            <input
              type="time"
              value={row.close}
              onChange={(event) => {
                const next = [...hours];
                next[index] = { ...row, close: event.target.value };
                setHours(next);
              }}
            />
          </label>
        ))}
        <button className="btn btn-primary" type="submit">
          Save hours
        </button>
        {saved ? <p>{saved}</p> : null}
      </form>
    </>
  );
}
