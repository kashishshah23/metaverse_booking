import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EVENTS } from '../data/events';

export default function Explore() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  // Unique categories from the DB (EVENTS)
  const categories = useMemo(
    () => Array.from(new Set(EVENTS.map(e => e.category))),
    []
  );

  // Example "live" feed: Music or tagged Live
  const live = useMemo(
    () =>
      EVENTS.filter(e => e.category === 'Music' || (e.tags || []).includes('Live'))
        .slice(0, 10),
    []
  );

  // Build curated tiles from categories. Pick the first event image for each category.
  const curated = useMemo(() => {
    return categories.map(cat => {
      const first = EVENTS.find(e => e.category === cat);
      return {
        title: cat,
        cat,
        count: EVENTS.filter(e => e.category === cat).length,
        image: first?.image,
        gradient: 'from-cyan-500/20 to-fuchsia-500/20',
      };
    });
  }, [categories]);

  // "Top categories" with counts (badge list)
  const topCats = useMemo(() => {
    const tally = categories
      .map(cat => ({ cat, count: EVENTS.filter(e => e.category === cat).length }))
      .sort((a, b) => b.count - a.count);
    return tally;
  }, [categories]);

  function submitSearch(e) {
    e.preventDefault();
    const query = q.trim();
    navigate(query ? `/events?q=${encodeURIComponent(query)}` : '/events');
  }

  return (
    <main className="py-10 md:py-14">
      <section className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl border border-custom-teal/20 bg-gradient-to-br from-white/40 to-custom-teal/10 p-6 sm:p-8 shadow-lg">
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-custom-teal/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Explore</h1>
          <p className="mt-2 max-w-3xl text-gray-600">
            Discover live shows, workshops, pro conferences, and meetups. Search or jump into a category.
          </p>

          {/* Search + quick category chips */}
          <form onSubmit={submitSearch} className="mt-6 flex flex-wrap items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events, tags, or locations…"
              className="w-full sm:w-80 rounded-full bg-white/60 px-4 py-2 text-gray-800 ring-1 ring-custom-teal/30 placeholder:text-gray-500 focus:outline-none focus:ring-custom-teal/60 shadow-sm"
            />
            {categories.map(c => (
              <Link
                key={c}
                to={`/events?cat=${encodeURIComponent(c)}`}
                className="rounded-full px-3 py-1.5 text-sm ring-1 ring-custom-teal/30 text-gray-700 hover:bg-custom-teal/10 hover:text-custom-teal transition"
              >
                {c}
              </Link>
            ))}
          </form>
        </div>

        {/* LIVE NOW (horizontal scroll) */}
        <h2 className="mt-10 text-xl font-semibold text-gray-800">Live now / Trending</h2>
        <div className="mt-4 overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-4 min-w-full">
            {live.map(e => (
              <Link
                key={e.id}
                to={`/events/${e.id}`}
                className="relative w-[320px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-custom-teal/80 bg-custom-teal hover:ring-white/50 transition shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={e.image} alt={e.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-500/30 px-2.5 py-1 text-xs text-emerald-700 ring-1 ring-emerald-600/40 backdrop-blur font-medium">
                      LIVE
                    </span>
                    <span className="rounded-full bg-white/60 px-3 py-1 text-xs text-custom-teal ring-1 ring-custom-teal/30 backdrop-blur">
                      {e.price}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-custom-teal">
                  <div className="font-medium text-white line-clamp-1">{e.title}</div>
                  <div className="text-xs text-white/80 mt-1 line-clamp-1">
                    {e.date} • {e.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CURATED = categories from DB */}
        <h2 className="mt-10 text-xl font-semibold text-gray-800">Curated categories</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {curated.map(col => (
            <Link
              key={col.title}
              to={`/events?cat=${encodeURIComponent(col.cat)}`}
              className={[
                'relative overflow-hidden rounded-2xl border border-custom-teal/80 p-4 shadow-lg',
                'bg-custom-teal',
                'hover:ring-1 hover:ring-white/50 transition',
              ].join(' ')}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                {col.image ? (
                  <img src={col.image} alt={col.title} className="h-full w-full object-cover opacity-80" />
                ) : (
                  <div className="h-full w-full bg-white/5" />
                )}
                <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_10%,rgba(0,245,255,.15),transparent),radial-gradient(60%_80%_at_80%_90%,rgba(218,0,255,.15),transparent)]" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-semibold text-white">{col.title}</div>
                <span className="text-white text-sm">Browse →</span>
              </div>
              <div className="mt-1 text-xs text-white/80">{col.count} events</div>
            </Link>
          ))}
        </div>

        {/* TOP CATEGORIES (was "Top creators") */}
        <h2 className="mt-10 text-xl font-semibold text-gray-800">Top categories</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {topCats.map(({ cat, count }) => (
            <Link
              key={cat}
              to={`/events?cat=${encodeURIComponent(cat)}`}
              className="flex items-center gap-3 rounded-2xl border border-custom-teal/80 bg-custom-teal p-3 hover:ring-1 hover:ring-white/50 transition shadow-lg"
            >
              <img
                alt={cat}
                className="h-10 w-10 rounded-full ring-2 ring-custom-teal/30"
                src={`https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(cat)}&backgroundColor=0a0f1f`}
              />
              <div className="flex-1">
                <div className="text-white font-medium">{cat}</div>
                <div className="text-xs text-white/80">{count} events</div>
              </div>
              <span className="rounded-full px-3 py-1.5 text-sm ring-1 ring-white/30 text-white bg-white/10">
                View
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
