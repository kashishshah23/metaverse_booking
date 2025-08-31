// src/pages/EventDetails.jsx
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { EVENTS } from '../data/events';
import EventCardPro from '../components/EventCardPro';
import { genPlaceholder } from '../utils/placeholders';

export default function EventDetails() {
  const { id } = useParams();
  const event = useMemo(() => EVENTS.find(e => e.id === id), [id]);

  if (!event) {
    return (
      <main className="py-10 md:py-14">
        <section className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-custom-teal/20 bg-white/40 p-8 text-gray-700 shadow-lg">
            Event not found.
            <Link to="/events" className="ml-3 underline text-custom-teal hover:text-custom-teal/80">Back to Events</Link>
          </div>
        </section>
      </main>
    );
  }

  const {
    title, date, location, price, category, tags = [], image
  } = event;

  const imgSrc = image || genPlaceholder(title);

  // related: same category first, then fill with others
  const related = useMemo(() => {
    const same = EVENTS.filter(e => e.id !== event.id && e.category === event.category);
    const rest = EVENTS.filter(e => e.id !== event.id && e.category !== event.category);
    return [...same, ...rest].slice(0, 6);
  }, [event]);

  return (
    <main className="py-10 md:py-14">
      <section className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Image panel (uses SAME image as card) */}
          <div className="rounded-3xl border border-custom-teal/20 bg-white/30 p-2 shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <img
                src={imgSrc}
                alt={title}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_10%,rgba(0,245,255,.15),transparent),radial-gradient(60%_80%_at_80%_90%,rgba(218,0,255,.15),transparent)]" />
              {/* chips */}
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <span className="rounded-full bg-white/60 px-3 py-1 text-xs text-gray-800 ring-1 ring-custom-teal/30 backdrop-blur">
                  {category}
                </span>
                {tags.slice(0, 3).map(t => (
                  <span
                    key={t}
                    className="rounded-full bg-custom-teal/20 px-2.5 py-1 text-[11px] text-custom-teal ring-1 ring-custom-teal/40 backdrop-blur"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {/* price pill */}
              <div className="absolute bottom-3 left-3 rounded-full bg-white/60 px-3 py-1 text-sm text-custom-teal ring-1 ring-custom-teal/30 backdrop-blur">
                {price}
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col justify-center">
            <p className="mb-2 text-xs tracking-[.25em] text-custom-teal/80">EVENT</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">{title}</h1>
            <p className="mt-3 text-gray-600">{date} • {location}</p>

            <p className="mt-6 max-w-2xl text-gray-600">
              Dive into an immersive event experience. Network, learn, and enjoy spectacular visuals in a metaverse-ready venue.
              Seamless booking with wallet integration and live 3D previews.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full px-5 py-2.5 bg-custom-teal hover:bg-custom-teal/90 ring-1 ring-custom-teal text-white transition shadow-lg">
                Book Ticket
              </button>
              <Link to="/events" className="rounded-full px-5 py-2.5 bg-white/80 hover:bg-white ring-1 ring-custom-teal/30 text-custom-teal transition shadow-md">
                Back to Events
              </Link>
            </div>
          </div>
        </div>

        {/* Related events */}
        <h2 className="mt-14 text-2xl font-bold text-gray-800">More events you may like</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {related.map(e => (
            <EventCardPro key={e.id} event={e} />
          ))}
        </div>
      </section>
    </main>
  );
}
