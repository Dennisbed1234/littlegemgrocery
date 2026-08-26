import { NextResponse } from "next/server";
import { getAdminState, inventoryValue, lowStock } from "@/lib/admin-store";
import { getStoreStatus } from "@/lib/store";

export async function GET() {
  const state = getAdminState();
  const status = getStoreStatus();
  const low = lowStock(state.inventory);

  return NextResponse.json({
    status: {
      ...status,
      today: state.hours.find((row) => row.day === status.weekday) ?? status.today,
    },
    hours: state.hours,
    inventoryCount: state.inventory.length,
    unitsOnHand: state.inventory.reduce((sum, item) => sum + item.quantity, 0),
    inventoryValue: inventoryValue(state.inventory),
    lowStock: low,
    announcement: state.announcement,
    activity: state.activity,
  });
}
