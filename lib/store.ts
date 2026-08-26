export const STORE = {
  name: "Little Gem Grocery",
  tagline: "James Bay’s corner shop for everyday essentials.",
  address: "148 Superior St",
  city: "Victoria, BC V8V 1T1",
  country: "Canada",
  phone: "+1 250-386-3632",
  phoneHref: "tel:+12503863632",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=148+Superior+St+Victoria+BC+V8V+1T1",
  mapsEmbed:
    "https://maps.google.com/maps?q=148%20Superior%20St%2C%20Victoria%2C%20BC%20V8V%201T1&z=16&output=embed",
  rating: 4.1,
  reviewCount: 86,
  neighborhood: "James Bay",
  timezone: "America/Vancouver",
  hours: [
    { day: "Sunday", open: "09:00", close: "21:00" },
    { day: "Monday", open: "08:00", close: "21:00" },
    { day: "Tuesday", open: "08:00", close: "21:00" },
    { day: "Wednesday", open: "08:00", close: "21:00" },
    { day: "Thursday", open: "08:00", close: "21:00" },
    { day: "Friday", open: "08:00", close: "21:00" },
    { day: "Saturday", open: "09:00", close: "21:00" },
  ],
};

export type HoursRow = (typeof STORE.hours)[number];

export function formatClock(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = ((h + 11) % 12) + 1;
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function getStoreStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: STORE.timezone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Monday";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const minutes = hour * 60 + minute;
  const today = STORE.hours.find((h) => h.day === weekday) ?? STORE.hours[1];
  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  const isOpen = minutes >= openMin && minutes < closeMin;

  return {
    weekday,
    isOpen,
    today,
    label: isOpen
      ? `Open now · until ${formatClock(today.close)}`
      : `Closed · opens ${formatClock(today.open)}`,
  };
}
