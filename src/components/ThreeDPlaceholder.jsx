import React from 'react';

export default function ThreeDPlaceholder({
  label = '3D World Preview',
  variant = 'cube',           // 'cube' | 'emoji' | 'bot'
  emoji = '🪩',               // used when variant === 'emoji'
  className = '',
}) {
  return (
    <div
      className={[
        'relative rounded-3xl p-1',
        'bg-[radial-gradient(60%_80%_at_20%_10%,rgba(0,245,255,.14),transparent),radial-gradient(50%_70%_at_80%_90%,rgba(218,0,255,.14),transparent)]',
        'border border-white/10 backdrop-blur-xl',
        className,
      ].join(' ')}
    >
      <div className="h-full w-full rounded-[22px] bg-[#F0FFFF] ring-1 ring-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_40px_80px_-40px_rgba(0,0,0,.8)] flex items-center justify-center relative overflow-hidden">
        {variant === 'emoji' && (
          <div className="select-none animate-[float_4s_ease-in-out_infinite]">
            <span className="text-[80px] sm:text-[110px] lg:text-[140px] leading-none">
              {emoji}
            </span>
          </div>
        )}

        {variant === 'bot' && (
          <MetaverseBot />
        )}

        {variant === 'cube' && (
          <Cube3D />
        )}

        {/* Subtle floor grid for depth */}
        <div className="pointer-events-none absolute inset-x-6 bottom-4 h-24 origin-bottom [transform:perspective(800px)_rotateX(55deg)] rounded-b-[22px] opacity-40">
          <div className="h-full w-full [background:repeating-linear-gradient(90deg,rgba(0,245,255,.18)_0px,rgba(0,245,255,.18)_1px,transparent_1px,transparent_40px),repeating-linear-gradient(0deg,rgba(218,0,255,.16)_0px,rgba(218,0,255,.16)_1px,transparent_1px,transparent_40px)]"></div>
        </div>

        <div className="absolute bottom-3 right-4 text-xs text-slate-300/80">{label}</div>
      </div>
    </div>
  );
}

/* --- Pure CSS 3D rotating cube (no libs) --- */
function Cube3D() {
  const size = 220;                // px
  const tz = size / 2;             // translateZ
  const faceClass =
    'absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 ring-1 ring-white/10 backdrop-blur-sm';

  return (
    <div className="relative h-[260px] w-[260px] sm:h-[300px] sm:w-[300px]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] animate-[cube-rotate_18s_linear_infinite]">
        <div className="relative" style={{ width: size, height: size }}>
          <div className={faceClass} style={{ transform: `translateZ(${tz}px)` }} />
          <div className={faceClass} style={{ transform: `rotateY(180deg) translateZ(${tz}px)` }} />
          <div className={faceClass} style={{ transform: `rotateY(90deg) translateZ(${tz}px)` }} />
          <div className={faceClass} style={{ transform: `rotateY(-90deg) translateZ(${tz}px)` }} />
          <div className={faceClass} style={{ transform: `rotateX(90deg) translateZ(${tz}px)` }} />
          <div className={faceClass} style={{ transform: `rotateX(-90deg) translateZ(${tz}px)` }} />
        </div>
      </div>
    </div>
  );
}

/* --- Minimal SVG "metaverse bot" that floats --- */
function MetaverseBot() {
  return (
    <div className="animate-[float_4s_ease-in-out_infinite]">
      <svg width="180" height="180" viewBox="0 0 200 200" fill="none" aria-hidden>
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0" stopColor="#00F5FF"/>
            <stop offset="1" stopColor="#DA00FF"/>
          </linearGradient>
        </defs>
        {/* glow */}
        <ellipse cx="100" cy="160" rx="46" ry="10" fill="#00F5FF" opacity=".12"/>
        {/* head */}
        <rect x="55" y="35" width="90" height="70" rx="18" fill="url(#grad)" opacity=".18" stroke="url(#grad)" strokeOpacity=".6"/>
        {/* eyes */}
        <circle cx="85" cy="70" r="8" fill="#F0FFFF"/>
        <circle cx="115" cy="70" r="8" fill="#F0FFFF"/>
        {/* antenna */}
        <line x1="100" y1="30" x2="100" y2="10" stroke="url(#grad)" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="100" cy="8" r="6" fill="url(#grad)"/>
        {/* body */}
        <rect x="65" y="108" width="70" height="48" rx="14" fill="url(#grad)" opacity=".12" stroke="url(#grad)" strokeOpacity=".5"/>
        {/* arms */}
        <rect x="38" y="112" width="20" height="12" rx="6" fill="url(#grad)" opacity=".18"/>
        <rect x="142" y="112" width="20" height="12" rx="6" fill="url(#grad)" opacity=".18"/>
      </svg>
    </div>
  );
}
