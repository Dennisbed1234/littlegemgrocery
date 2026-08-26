import { NextResponse } from "next/server";
import { getAdminState, logActivity } from "@/lib/admin-store";
import { STORE } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ hours: getAdminState().hours });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => ({}));
  const incoming = Array.isArray(body.hours) ? body.hours : [];
  const days = STORE.hours.map((row) => row.day);
  const hours = days.map((day) => {
    const match = incoming.find((row: { day?: string }) => row.day === day);
    const open = String(match?.open ?? "08:00");
    const close = String(match?.close ?? "21:00");
    return { day, open, close };
  });
  const state = getAdminState();
  state.hours = hours;
  logActivity("Updated weekly hours");
  return NextResponse.json({ hours });
}
