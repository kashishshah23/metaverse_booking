// src/pages/Events.jsx
import React, { useMemo, useState } from 'react';
import EventCardPro from '../components/EventCardPro';
import { EVENTS } from '../data/events';
import { useLocation } from 'react-router-dom';

const CATEGORIES = ['All', ...Array.from(new Set(EVENTS.map(e => e.category)))];

export default function Events() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const initialQ = params.get('q') || '';
  const initialCatRaw = params.get('cat');
  const initialCat = CATEGORIES.includes(initialCatRaw) ? initialCatRaw : 'All';

  const [query, setQuery] = React.useState(initialQ);
  const [cat, setCat] = React.useState(initialCat);
  const [onlyFree, setOnlyFree] = React.useState(params.get('free') === '1');
  const [sort, setSort] = React.useState(params.get('sort') || 'date');

  const filtered = useMemo(() => {
    let list = [...EVENTS];

    if (cat !== 'All') list = list.filter((e) => e.category === cat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          (e.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (onlyFree) list = list.filter((e) => (e.price || '').toLowerCase() === 'free');

    // Sort
    if (sort === 'price-asc') {
      list.sort((a, b) => priceNum(a.price) - priceNum(b.price));
    } else if (sort === 'price-desc') {
      list.sort((a, b) => priceNum(b.price) - priceNum(a.price));
    } else {
      // date sort could be smarter; we’ll keep input order for demo
    }

    return list;
  }, [query, cat, onlyFree, sort]);

  return (
    <main className="py-10 md:py-14">
      <section className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="relative overflow-hidden rounded-3xl border border-custom-teal/20 bg-gradient-to-br from-white/40 to-custom-teal/10 p-6 sm:p-8 shadow-lg">
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-custom-teal/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Explore Events</h1>
          <p className="mt-2 max-w-3xl text-gray-600">
            Discover concerts, conferences, workshops, and meetups across immersive worlds. Filter, search, and find your next experience.
          </p>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Search */}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, tag, or location…"
              className="w-full sm:w-72 rounded-full bg-white/60 px-4 py-2 text-gray-800 ring-1 ring-custom-teal/30 placeholder:text-gray-500 focus:outline-none focus:ring-custom-teal/60 shadow-sm"
            />
            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={[
                    'rounded-full px-3 py-1.5 text-sm ring-1 transition',
                    c === cat
                      ? 'bg-custom-teal text-white ring-custom-teal'
                      : 'text-gray-700 ring-custom-teal/30 hover:bg-custom-teal/10 hover:text-custom-teal',
                  ].join(' ')}
                >
                  {c}
                </button>
              ))}
            </div>
            {/* Free toggle */}
            <button
              onClick={() => setOnlyFree((v) => !v)}
              className={[
                'rounded-full px-3 py-1.5 text-sm ring-1 transition',
                onlyFree ? 'bg-custom-teal/20 text-custom-teal ring-custom-teal/50' : 'text-gray-700 ring-custom-teal/30 hover:bg-custom-teal/10 hover:text-custom-teal',
              ].join(' ')}
            >
              Free only
            </button>
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full bg-white/60 px-3 py-1.5 text-sm text-gray-800 ring-1 ring-custom-teal/30 focus:outline-none focus:ring-custom-teal/60 shadow-sm"
            >
              <option value="date">Sort: Default</option>
              <option value="price-asc">Sort: Price ↑</option>
              <option value="price-desc">Sort: Price ↓</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => (
            <EventCardPro key={e.id} event={e} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-custom-teal/20 bg-white/40 p-6 text-gray-600 shadow-lg">
            No events match your filters. Try a different category or clear search.
          </div>
        )}
      </section>
    </main>
  );
}

function priceNum(p) {
  if (!p) return 0;
  if (String(p).toLowerCase() === 'free') return 0;
  const n = Number(String(p).replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
}
