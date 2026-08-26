import { STORE, type HoursRow } from "@/lib/store";

export type InventoryItem = {
  id: string;
  name: string;
  category: "Dairy" | "Produce" | "Frozen" | "Snacks" | "Household" | "Bakery" | "Other";
  sku: string;
  price: number;
  quantity: number;
  unit: string;
};

export type Announcement = {
  active: boolean;
  message: string;
  updatedAt: string;
};

export type Activity = {
  id: string;
  text: string;
  at: string;
};

type AdminState = {
  hours: HoursRow[];
  inventory: InventoryItem[];
  announcement: Announcement;
  activity: Activity[];
};

function seedInventory(): InventoryItem[] {
  return [
    { id: "1", name: "Homogenized milk 2L", category: "Dairy", sku: "DRY-201", price: 5.49, quantity: 18, unit: "carton" },
    { id: "2", name: "Large eggs (12)", category: "Dairy", sku: "DRY-118", price: 4.99, quantity: 9, unit: "dozen" },
    { id: "3", name: "Salted butter 454g", category: "Dairy", sku: "DRY-330", price: 6.79, quantity: 7, unit: "pack" },
    { id: "4", name: "Bananas", category: "Produce", sku: "PRD-010", price: 1.29, quantity: 24, unit: "lb" },
    { id: "5", name: "Local apples", category: "Produce", sku: "PRD-044", price: 2.49, quantity: 4, unit: "lb" },
    { id: "6", name: "White bread loaf", category: "Bakery", sku: "BKY-101", price: 3.29, quantity: 11, unit: "loaf" },
    { id: "7", name: "Vanilla ice cream 1.5L", category: "Frozen", sku: "FRZ-212", price: 6.99, quantity: 6, unit: "tub" },
    { id: "8", name: "Frozen pizza", category: "Frozen", sku: "FRZ-308", price: 7.49, quantity: 3, unit: "box" },
    { id: "9", name: "Kettle chips", category: "Snacks", sku: "SNK-155", price: 3.99, quantity: 22, unit: "bag" },
    { id: "10", name: "Dish soap", category: "Household", sku: "HSE-019", price: 4.25, quantity: 8, unit: "bottle" },
    { id: "11", name: "Chocolate chips 300g", category: "Bakery", sku: "BKY-277", price: 4.15, quantity: 2, unit: "bag" },
    { id: "12", name: "Orange juice 1.75L", category: "Other", sku: "OTR-088", price: 5.15, quantity: 13, unit: "jug" },
  ];
}

const globalStore = globalThis as typeof globalThis & { __lgAdmin?: AdminState };

function seed(): AdminState {
  return {
    hours: STORE.hours.map((row) => ({ ...row })),
    inventory: seedInventory(),
    announcement: {
      active: true,
      message: "Fresh bread and 2% milk in this morning. Lottery desk open all day.",
      updatedAt: new Date().toISOString(),
    },
    activity: [
      { id: "a1", text: "Seed inventory loaded for James Bay shop", at: new Date().toISOString() },
    ],
  };
}

export function getAdminState(): AdminState {
  if (!globalStore.__lgAdmin) globalStore.__lgAdmin = seed();
  return globalStore.__lgAdmin;
}

export function logActivity(text: string) {
  const state = getAdminState();
  state.activity = [{ id: crypto.randomUUID(), text, at: new Date().toISOString() }, ...state.activity].slice(0, 12);
}

export function lowStock(items = getAdminState().inventory, threshold = 5) {
  return items.filter((item) => item.quantity <= threshold);
}

export function inventoryValue(items = getAdminState().inventory) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
