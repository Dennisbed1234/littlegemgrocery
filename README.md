# Little Gem Grocery

Neighborhood website for **Little Gem Grocery**, an independent convenience store at **148 Superior St, Victoria, BC V8V 1T1**, plus a staff admin desk.

## Public site

- Open / closed status in `America/Vancouver`
- Weekly hours, map, phone, and what the shop stocks
- Optional announcement bar driven by the admin desk

## Admin dashboard

Visit `/admin` (also linked in the site footer as **Staff desk**).

| Screen | What it does |
| --- | --- |
| Overview | Open/closed, SKU counts, shelf value, low stock, recent activity |
| Inventory | Add / edit / delete items, search and filter, low-stock tags |
| Hours | Edit Mon–Sun open and close times |
| Notice | Publish or hide a homepage announcement |

Default password: `littlegem`

Set these in production:

```
ADMIN_PASSWORD=your-strong-password
ADMIN_SECRET=long-random-string
```

Sessions last 12 hours (httpOnly cookie). Inventory and hours live in server memory for this demo, so they reset when the server restarts. Swap `lib/admin-store.ts` for a database when you want persistence.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Route handlers + middleware auth
- Hand-rolled CSS

## Run locally

```bash
npm install
npm run dev
```

- Shop: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Deploy

Import `Dennisbed1234/little-gem-grocery` on Vercel and add the two env vars above.

## Store facts used in the build

| Field | Value |
| --- | --- |
| Address | 148 Superior St, Victoria, BC V8V 1T1 |
| Phone | +1 250-386-3632 |
| Hours | Mon–Fri 8am–9pm · Sat–Sun 9am–9pm |
| Rating | 4.1 (86 Google reviews at time of build) |
