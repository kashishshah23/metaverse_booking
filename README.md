# MetaBook — Metaverse Event Booking Platform

A polished **React + Vite + Tailwind** concept that demonstrates modern UI/UX craft for a metaverse‑style event platform. 
The goal is to showcase **discovery → decision → booking** flows with immersive visuals (glassmorphism + neon), 
micro‑interactions (hover tilt, shine, animated placeholders), and clean information architecture.

## Purpose

**MetaBook** helps users **discover, preview, and book** immersive events—concerts, conferences, workshops, meetups, and expos—across virtual worlds. 
It doubles as a **portfolio case study** to prove skills in:

- Building a scalable design system (colors/typography/components)

- Designing discoverability (Explore + Events with filters/search)

- Interaction design (3D placeholder bot/cube, card tilt/shine, animated chips)

- Accessibility and responsive layout

## Tech Stack

- **React 18** + **Vite** (fast dev + HMR)

- **Tailwind CSS 3.4** (utility‑first styling)

- **React Router** (multi‑page SPA)

- Lightweight custom animations (CSS keyframes, transforms) — **no WebGL deps**

## Key UX Decisions

- **Neon glass** visual language: deep space backgrounds with cyan/fuchsia accents

- **Wider container** (`max-w-[1600px]`) to reduce side gutters and make hero content breathe

- **Data‑driven UI**: Events are seeded (`src/data/events.js`), Explore/Events read from the same source

- **3D Placeholder**: emoji/bot/cube variants for hero/empty states (no assets required)

- **EventCardPro**: interactive tilt + shine with chips, tags, and price pill

## Pages & Screens

![Landing — hero with animated 3D bot placeholder](readme_assets/screenshot_603_png)

*Landing — hero with animated 3D bot placeholder*

![Events — hero with filters, search, sort; interactive cards](readme_assets/screenshot_604_png)

*Events — hero with filters, search, sort; interactive cards*

![Event Details — uses the same image as its grid card; related events](readme_assets/screenshot_605_png)

*Event Details — uses the same image as its grid card; related events*

![Profile — tickets & wallet placeholder modules](readme_assets/screenshot_606_png)

*Profile — tickets & wallet placeholder modules*

![Explore — hero + Live/Trending (price no longer overlaps)](readme_assets/screenshot_609_png)

*Explore — hero + Live/Trending (price no longer overlaps)*

![Explore — curated categories and top categories (data‑driven)](readme_assets/screenshot_610_png)

*Explore — curated categories and top categories (data‑driven)*

## Data Model

Events are defined in `src/data/events.js`:

```js
{
  id: 'neo-1',
  title: 'Neon Night Conference',
  date: 'Sep 12, 2025',
  location: 'NeoCity • VR',
  price: '$39',           // or 'Free'
  category: 'Conference', // used for filtering and Explore categories
  tags: ['Web3', 'AR/VR'],
  image: 'https://picsum.photos/seed/neon-night/1600/1000'
}
```

Both **Events** and **Explore** pages consume this data, so clicking a curated category deep‑links to `/events?cat=Conference` and renders actual results.

## Components

- `ThreeDPlaceholder` — modes: `cube`, `bot`, `emoji`

- `EventCardPro` — tilt on cursor, shine sweep, category/tags, price pill

- `Navbar` — glass tabs with active state

## Getting Started

```bash
# 1) Create app
npm create vite@latest metaboook -- --template react
cd metaboook

# 2) Install deps
npm i
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3) Add Tailwind to index.css and paste the styles/keyframes used in this project
# 4) Add the src/ files from this repo (pages, components, data)
# 5) Run
npm run dev
```

## Accessibility

- Sufficient contrast on chips and buttons

- Focus‑visible styles via Tailwind ring utilities

- Semantic headings and descriptive alt text for images

## Roadmap

- Pagination / infinite scroll on Events

- URL sync for filters (`?q`, `?cat`, `?free`, `?sort`)

- Wallet connect flow (mock + real provider)

- Seat map and checkout steps
