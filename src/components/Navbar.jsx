// src/components/Navbar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-custom-teal border-b border-custom-teal/80">
      <nav className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-semibold text-white">MetaBook</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {[
            ['/', 'Home'],
            ['/events', 'Events'],
            ['/profile', 'Profile'],
            ['/explore', 'Explore'],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'rounded-full px-3.5 py-1.5 text-sm transition',
                  'ring-1 ring-white/30 hover:bg-white/10',
                  isActive ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
