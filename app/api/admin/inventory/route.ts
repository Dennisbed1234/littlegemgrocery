import { NextResponse } from "next/server";
import { getAdminState, logActivity, type InventoryItem } from "@/lib/admin-store";

const CATEGORIES: InventoryItem["category"][] = [
  "Dairy",
  "Produce",
  "Frozen",
  "Snacks",
  "Household",
  "Bakery",
  "Other",
];

function parseItem(body: Partial<InventoryItem>, fallback?: InventoryItem): InventoryItem | null {
  const name = String(body.name ?? fallback?.name ?? "").trim();
  const sku = String(body.sku ?? fallback?.sku ?? "").trim().toUpperCase();
  const category = CATEGORIES.includes(body.category as InventoryItem["category"])
    ? (body.category as InventoryItem["category"])
    : fallback?.category ?? "Other";
  const price = Number(body.price ?? fallback?.price ?? 0);
  const quantity = Number(body.quantity ?? fallback?.quantity ?? 0);
  const unit = String(body.unit ?? fallback?.unit ?? "each").trim() || "each";
  if (!name || !sku || Number.isNaN(price) || Number.isNaN(quantity)) return null;
  return {
    id: fallback?.id ?? crypto.randomUUID(),
    name,
    sku,
    category,
    price: Math.max(0, Math.round(price * 100) / 100),
    quantity: Math.max(0, Math.round(quantity)),
    unit,
  };
}

export async function GET() {
  return NextResponse.json({ items: getAdminState().inventory });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const item = parseItem(body);
  if (!item) return NextResponse.json({ error: "Name, SKU, price, and quantity are required." }, { status: 400 });
  const state = getAdminState();
  if (state.inventory.some((row) => row.sku === item.sku)) {
    return NextResponse.json({ error: "That SKU already exists." }, { status: 409 });
  }
  state.inventory = [item, ...state.inventory];
  logActivity(`Added ${item.name} (${item.sku})`);
  return NextResponse.json({ item }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => ({}));
  const state = getAdminState();
  const current = state.inventory.find((row) => row.id === body.id);
  if (!current) return NextResponse.json({ error: "Item not found." }, { status: 404 });
  const item = parseItem(body, current);
  if (!item) return NextResponse.json({ error: "Invalid item." }, { status: 400 });
  if (state.inventory.some((row) => row.sku === item.sku && row.id !== item.id)) {
    return NextResponse.json({ error: "That SKU already exists." }, { status: 409 });
  }
  state.inventory = state.inventory.map((row) => (row.id === item.id ? item : row));
  logActivity(`Updated ${item.name}`);
  return NextResponse.json({ item });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const state = getAdminState();
  const current = state.inventory.find((row) => row.id === id);
  if (!current) return NextResponse.json({ error: "Item not found." }, { status: 404 });
  state.inventory = state.inventory.filter((row) => row.id !== id);
  logActivity(`Removed ${current.name}`);
  return NextResponse.json({ ok: true });
}
