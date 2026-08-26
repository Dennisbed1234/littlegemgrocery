# Little Gem Grocery

Neighborhood website for **Little Gem Grocery**, an independent convenience store at **148 Superior St, Victoria, BC V8V 1T1**.

Live details on the site:

- Open / closed status in `America/Vancouver`
- Weekly hours
- What the shop typically stocks
- Phone, map, and directions
- Review highlights from public listings

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Hand-rolled CSS (no component library)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

This repo is ready for [Vercel](https://vercel.com): import `Dennisbed1234/little-gem-grocery` and deploy. No environment variables required.

## Store facts used in the build

| Field | Value |
| --- | --- |
| Address | 148 Superior St, Victoria, BC V8V 1T1 |
| Phone | +1 250-386-3632 |
| Hours | Mon–Fri 8am–9pm · Sat–Sun 9am–9pm |
| Rating | 4.1 (86 Google reviews at time of build) |

Hours and rating should be double-checked against the shop if you publish this as an official page.

## Project layout

```
app/            pages and global styles
lib/store.ts    single source of truth for address, hours, phone
public/         static assets
```
