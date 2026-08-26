import { NextResponse } from "next/server";
import { getAdminState } from "@/lib/admin-store";
import { formatClock, getStoreStatus } from "@/lib/store";

export async function GET() {
  const state = getAdminState();
  const status = getStoreStatus();
  const today = state.hours.find((row) => row.day === status.weekday) ?? status.today;
  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const nowParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const minutes =
    Number(nowParts.find((p) => p.type === "hour")?.value ?? 0) * 60 +
    Number(nowParts.find((p) => p.type === "minute")?.value ?? 0);
  const isOpen = minutes >= oh * 60 + om && minutes < ch * 60 + cm;

  return NextResponse.json({
    hours: state.hours,
    announcement: state.announcement,
    status: {
      weekday: status.weekday,
      isOpen,
      today,
      label: isOpen
        ? `Open now · until ${formatClock(today.close)}`
        : `Closed · opens ${formatClock(today.open)}`,
    },
  });
}
