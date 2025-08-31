// src/utils/placeholders.js
export function genPlaceholder(text = 'Metaverse Event') {
  const svg = `
  <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="#00F5FF" offset="0"/>
        <stop stop-color="#8B00FF" offset="1"/>
      </linearGradient>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feBlend mode="screen"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#0A0F1F"/>
    <rect x="24" y="24" width="1152" height="752" rx="36" fill="url(#g)" opacity="0.18"/>
    <g filter="url(#noise)" opacity="0.15">
      <rect width="1200" height="800" fill="#fff" opacity="0.2"/>
    </g>
    <text x="50%" y="50%" font-size="46" fill="#E5E7EB" font-family="Inter,system-ui" text-anchor="middle" dominant-baseline="middle">
      ${text}
    </text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
