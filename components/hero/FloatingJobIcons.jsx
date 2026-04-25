"use client";

import { memo } from "react";

/**
 * FloatingJobIcons — Small ambient icons floating near the maps.
 * Briefcase, user, location pin, document, globe icons.
 * Uses CSS animations for smooth GPU-composited movement.
 * Hidden on mobile (<768px) for performance.
 */

const icons = [
  {
    id: "briefcase",
    x: 8,
    y: 18,
    delay: 0,
    duration: 6,
    path: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  },
  {
    id: "user",
    x: 88,
    y: 65,
    delay: 1.2,
    duration: 7,
    path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    id: "pin",
    x: 50,
    y: 85,
    delay: 0.6,
    duration: 5.5,
    path: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    id: "document",
    x: 15,
    y: 75,
    delay: 1.8,
    duration: 6.5,
    path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: "globe",
    x: 92,
    y: 22,
    delay: 2.4,
    duration: 7.5,
    path: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

function FloatingJobIcons() {
  return (
    <div className="absolute inset-0 z-[3] pointer-events-none hidden md:block">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute animate-icon-float"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animationDelay: `${icon.delay}s`,
            animationDuration: `${icon.duration}s`,
          }}
        >
          <svg
            className="w-5 h-5 text-brand-accent/25"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={icon.path} />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default memo(FloatingJobIcons);
