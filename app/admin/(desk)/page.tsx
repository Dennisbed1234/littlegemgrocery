"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Overview = {
  status: { isOpen: boolean; label: string; weekday: string };
  inventoryCount: number;
  unitsOnHand: number;
  inventoryValue: number;
  lowStock: { id: string; name: string; quantity: number; unit: string }[];
  announcement: { active: boolean; message: string };
  activity: { id: string; text: string; at: string }[];
};

export default function AdminOverviewPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/overview")
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load overview");
        setData(await response.json());
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) return <p className="admin-error">{error}</p>;
  if (!data) return <p>Loading desk…</p>;

  return (
    <>
      <header className="desk-header">
        <div>
          <p className="eyebrow">James Bay shop</p>
          <h1>Today at Little Gem</h1>
        </div>
        <Link className="btn btn-primary" href="/admin/inventory">
          Adjust stock
        </Link>
      </header>

      <section className="stat-grid">
        <article className="stat">
          <span className="admin-label">Storefront</span>
          <b>{data.status.isOpen ? "Open" : "Closed"}</b>
          <p>{data.status.label}</p>
        </article>
        <article className="stat">
          <span className="admin-label">SKUs</span>
          <b>{data.inventoryCount}</b>
          <p>{data.unitsOnHand} units on hand</p>
        </article>
        <article className="stat">
          <span className="admin-label">Shelf value</span>
          <b>${data.inventoryValue.toFixed(0)}</b>
          <p>Price × quantity</p>
        </article>
        <article className="stat">
          <span className="admin-label">Low stock</span>
          <b>{data.lowStock.length}</b>
          <p>At or under 5 units</p>
        </article>
      </section>

      <section className="split">
        <article className="card">
          <p className="eyebrow">Needs a reorder</p>
          <h2 className="section-title">Low stock</h2>
          {data.lowStock.length === 0 ? (
            <p>Nothing is below the threshold.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {data.lowStock.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="num">
                      {item.quantity} {item.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </article>
        <article className="card">
          <p className="eyebrow">Notice</p>
          <h2 className="section-title">On the website</h2>
          <p>{data.announcement.active ? data.announcement.message : "No public notice is showing."}</p>
          <p style={{ marginTop: "1rem" }}>
            <Link className="btn btn-ghost" href="/admin/announcements">
              Edit notice
            </Link>
          </p>
          <h3 style={{ marginTop: "1.4rem" }}>Recent activity</h3>
          <ul className="activity-list">
            {data.activity.map((item) => (
              <li key={item.id}>
                {item.text}
                <time dateTime={item.at}>{new Date(item.at).toLocaleString("en-CA")}</time>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
