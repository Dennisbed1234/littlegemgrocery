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
    <div
      className="wrap"
      style={{
        maxWidth: "none",
        width: "100%",
        background: "#123a6b",
        color: "#eef4fb",
        padding: "0.6rem 1.25rem",
        fontFamily: "Barlow Condensed, sans-serif",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontSize: "0.92rem",
      }}
    >
      {message}
    </div>
  );
}
