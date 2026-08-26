"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  quantity: number;
  unit: string;
};

const EMPTY = {
  name: "",
  sku: "",
  category: "Other",
  price: "",
  quantity: "",
  unit: "each",
};

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch("/api/admin/inventory");
    const data = await response.json();
    setItems(data.items ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => {
    return items.filter((item) => {
      const haystack = `${item.name} ${item.sku}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [items, query, category]);

  function startEdit(item: Item) {
    setEditing(item.id);
    setForm({
      name: item.name,
      sku: item.sku,
      category: item.category,
      price: String(item.price),
      quantity: String(item.quantity),
      unit: item.unit,
    });
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const payload = {
      id: editing,
      name: form.name,
      sku: form.sku,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      unit: form.unit,
    };
    const response = await fetch("/api/admin/inventory", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Could not save item.");
      return;
    }
    setForm(EMPTY);
    setEditing(null);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Remove this item from inventory?")) return;
    await fetch(`/api/admin/inventory?id=${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <>
      <header className="desk-header">
        <div>
          <p className="eyebrow">{items.length} products</p>
          <h1>Inventory</h1>
        </div>
      </header>

      <form className="card" onSubmit={onSubmit} style={{ marginBottom: "1rem" }}>
        <p className="eyebrow">{editing ? "Edit item" : "Add item"}</p>
        <div className="form-grid" style={{ marginTop: "0.8rem" }}>
          <label className="admin-field">
            <span>Name</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label className="admin-field">
            <span>SKU</span>
            <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required />
          </label>
          <label className="admin-field">
            <span>Category</span>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {["Dairy", "Produce", "Frozen", "Snacks", "Household", "Bakery", "Other"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-grid tight">
          <label className="admin-field">
            <span>Price (CAD)</span>
            <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </label>
          <label className="admin-field">
            <span>Quantity</span>
            <input type="number" min="0" step="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
          </label>
          <label className="admin-field">
            <span>Unit</span>
            <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          </label>
          <div className="admin-field">
            <span>&nbsp;</span>
            <button className="btn btn-primary" type="submit">
              {editing ? "Save changes" : "Add to shelf"}
            </button>
          </div>
        </div>
        {editing ? (
          <button
            className="ghost-btn"
            type="button"
            onClick={() => {
              setEditing(null);
              setForm(EMPTY);
            }}
          >
            Cancel edit
          </button>
        ) : null}
        {error ? <p className="admin-error">{error}</p> : null}
      </form>

      <div className="toolbar">
        <input placeholder="Search name or SKU" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {["All", "Dairy", "Produce", "Frozen", "Snacks", "Household", "Bakery", "Other"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.name}
                  <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{item.unit}</div>
                </td>
                <td>{item.sku}</td>
                <td>
                  <span className="tag">{item.category}</span>
                </td>
                <td className="num">${item.price.toFixed(2)}</td>
                <td className="num">
                  <span className={item.quantity <= 5 ? "tag warn" : "tag ok"}>{item.quantity}</span>
                </td>
                <td>
                  <div className="row-actions">
                    <button type="button" onClick={() => startEdit(item)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => remove(item.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
