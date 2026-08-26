"use client";

import { FormEvent, useEffect, useState } from "react";

export default function AnnouncementsPage() {
  const [active, setActive] = useState(true);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    fetch("/api/admin/announcement")
      .then((response) => response.json())
      .then((data) => {
        setActive(Boolean(data.active));
        setMessage(data.message ?? "");
      });
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/announcement", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active, message }),
    });
    if (response.ok) setSaved("Notice saved. It appears on the public homepage when active.");
  }

  return (
    <>
      <header className="desk-header">
        <div>
          <p className="eyebrow">Storefront</p>
          <h1>Public notice</h1>
        </div>
      </header>
      <form className="card" onSubmit={onSubmit}>
        <label className="admin-field">
          <span>Message</span>
          <textarea
            rows={4}
            maxLength={180}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="e.g. Fresh milk delivery at 10am"
          />
        </label>
        <label className="toggle">
          <input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} />
          Show this bar on the website
        </label>
        <button className="btn btn-primary" type="submit">
          Publish notice
        </button>
        {saved ? <p style={{ marginTop: "0.8rem" }}>{saved}</p> : null}
      </form>
    </>
  );
}
