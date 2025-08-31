// src/components/EventCardPro.jsx
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { genPlaceholder } from '../utils/placeholders';

export default function EventCardPro({ event }) {
  if (!event) return null;

  const {
    id,
    title = 'Untitled Event',
    date = 'Date TBA',
    location = 'Location TBA',
    price = 'Price TBA',
    category = 'Event',
    tags = [],
    image,
  } = event;

  const imgSrc = image || genPlaceholder(title);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: '50%', gy: '50%' });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;   // 0..1
    const ry = (px - 0.5) * 10; // rotateY
    const rx = (0.5 - py) * 8;  // rotateX
    setTilt({ rx, ry, gx: `${px * 100}%`, gy: `${py * 100}%` });
  };

  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: '50%', gy: '50%' });

  const content = (
    <>
      {/* image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,31,.0)_0%,rgba(10,15,31,.45)_65%,rgba(10,15,31,.75)_100%)]"></div>

        {/* shine sweep */}
        <div
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 opacity-0 group-hover:opacity-40"
          style={{
            background:
              'linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.9) 50%, rgba(255,255,255,0) 100%)',
            animation: 'shine 1200ms ease',
          }}
        />

        {/* category chip */}
        <div className="absolute left-3 top-3 rounded-full bg-white/60 px-3 py-1 text-xs text-gray-800 ring-1 ring-custom-teal/30 backdrop-blur">
          {category}
        </div>

        {/* tags */}
        <div className="absolute right-3 top-3 flex gap-2">
          {tags.slice(0, 2).map((t) => (
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

      {/* text */}
      <div className="p-4 bg-custom-teal">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/80">
          {date} • {location}
        </p>

        {/* CTA on hover */}
        <div className="mt-3 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center rounded-full bg-custom-teal/20 px-3 py-1 text-xs text-custom-teal ring-1 ring-custom-teal/40">
            View details
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-80">
            <path fill="currentColor" d="M12 2L3 7v10l9 5 9-5V7z" />
          </svg>
        </div>
      </div>
    </>
  );

  // Non-clickable if no id
  const Wrapper = id ? Link : 'div';
  const wrapperProps = id ? { to: `/events/${id}` } : {};

  return (
    <Wrapper
      {...wrapperProps}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group block overflow-hidden rounded-2xl bg-custom-teal ring-1 ring-custom-teal/80 hover:ring-white/50 transition will-change-transform shadow-lg"
      style={{
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        animation: 'subtle-pop 160ms ease-out',
        background:
          `linear-gradient(135deg, #307D7E, #307D7E), radial-gradient(180px 120px at ${tilt.gx} ${tilt.gy}, rgba(255,255,255,.1), transparent 60%)`,
      }}
    >
      {content}
    </Wrapper>
  );
}
