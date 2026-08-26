"use client";

import { useEffect, useState } from "react";

export function StoreBanner() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/public/store")
      .then((response) => response.json())
      .then((data) => {
        if (data.announcement?.active && data.announcement.message) {
          setMessage(data.announcement.message);
        }
      })
      .catch(() => undefined);
  }, []);

  if (!message) return null;

  return (
    <div className="store-banner">
      <div className="wrap">{message}</div>
    </div>
  );
}
