import { NextResponse } from "next/server";
import { getAdminState, logActivity } from "@/lib/admin-store";

export async function GET() {
  return NextResponse.json(getAdminState().announcement);
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => ({}));
  const state = getAdminState();
  state.announcement = {
    active: Boolean(body.active),
    message: String(body.message ?? "").slice(0, 180),
    updatedAt: new Date().toISOString(),
  };
  logActivity(state.announcement.active ? "Published storefront announcement" : "Hid storefront announcement");
  return NextResponse.json(state.announcement);
}
