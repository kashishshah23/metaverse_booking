// src/components/EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { genPlaceholder } from '../utils/placeholders';

export default function EventCard({ event }) {
  // Guard: if nothing passed, render nothing (or a skeleton)
  if (!event || typeof event !== 'object') return null;

  const {
    id,
    title = 'Untitled Event',
    date = 'Date TBA',
    location = 'Location TBA',
    price = 'Price TBA',
    image,
  } = event;

  const imgSrc = image || genPlaceholder(title);

  const CardInner = (
    <>
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-4 bg-custom-teal">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/80">{date} • {location}</p>
        <p className="mt-2 text-white font-medium">{price}</p>
      </div>
    </>
  );

  // No id? show a non-clickable card
  if (!id) {
    return (
      <div className="group block overflow-hidden rounded-2xl bg-custom-teal ring-1 ring-custom-teal/80 opacity-90 shadow-lg">
        {CardInner}
      </div>
    );
  }

  return (
    <Link
      to={`/events/${id}`}
      className="group block overflow-hidden rounded-2xl bg-custom-teal ring-1 ring-custom-teal/80 hover:ring-white/50 transition shadow-lg"
    >
      {CardInner}
    </Link>
  );
}
