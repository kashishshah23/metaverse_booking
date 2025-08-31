// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThreeDPlaceholder from '../components/ThreeDPlaceholder';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] py-10 md:py-14">
      {/* Wider container + tighter side padding */}
      <section className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 xl:gap-14 2xl:gap-16 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: copy */}
          <div>
            <p className="mb-4 text-xs tracking-[.25em] text-custom-teal/80">METAVERSE EVENTS</p>
            <h1 className="text-[40px] sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-gray-800">
              Discover · Book · <span className="bg-gradient-to-r from-custom-teal to-cyan-500 bg-clip-text text-transparent">Attend</span>
            </h1>
            <p className="mt-6 max-w-2xl text-gray-600">
              A futuristic platform to explore immersive concerts, conferences, and meetups across virtual worlds. Seamless booking with wallet
              integration and real-time 3D venue previews.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/events" className="rounded-full px-5 py-2.5 bg-custom-teal hover:bg-custom-teal/90 ring-1 ring-custom-teal text-white transition shadow-lg">
                Explore Events
              </Link>
              <Link to="/profile" className="rounded-full px-5 py-2.5 bg-white/80 hover:bg-white ring-1 ring-custom-teal/30 text-custom-teal transition shadow-md">
                My Tickets
              </Link>
            </div>
          </div>

          {/* Right: 3D Placeholder (no image needed) */}
         
          <ThreeDPlaceholder
            className="h-[360px] sm:h-[420px] lg:h-[520px] w-full"
            label="3D World Preview"
            variant="bot"      // try: 'emoji' | 'bot' | 'cube'
            // emoji="🤖"      // only used when variant="emoji"
          />

        </div>
      </section>
    </main>
  );
}
