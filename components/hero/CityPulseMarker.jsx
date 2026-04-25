"use client";

import { memo } from "react";

/**
 * CityPulseMarker — Animated glowing pulse dot for city locations.
 * Uses CSS animations for GPU performance (no React re-renders).
 *
 * @param {string} city   — City name label
 * @param {number} x      — Percentage left position
 * @param {number} y      — Percentage top position
 * @param {number} delay  — Animation delay in seconds for stagger
 * @param {boolean} primary — If true, renders larger/brighter (for major cities)
 */
function CityPulseMarker({ city, x, y, delay = 0, primary = false }) {
  const size = primary ? 6 : 4;
  const pulseSize = primary ? 20 : 14;

  return (
    <div
      className="absolute group z-10"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      {/* Outer pulse ring 1 */}
      <span
        className="absolute rounded-full animate-city-pulse"
        style={{
          width: pulseSize,
          height: pulseSize,
          left: -(pulseSize - size) / 2,
          top: -(pulseSize - size) / 2,
          backgroundColor: "var(--color-brand-accent)",
          opacity: 0,
          animationDelay: `${delay}s`,
        }}
      />
      {/* Outer pulse ring 2 (offset timing) */}
      <span
        className="absolute rounded-full animate-city-pulse"
        style={{
          width: pulseSize,
          height: pulseSize,
          left: -(pulseSize - size) / 2,
          top: -(pulseSize - size) / 2,
          backgroundColor: "var(--color-brand-accent)",
          opacity: 0,
          animationDelay: `${delay + 1}s`,
        }}
      />
      {/* Inner solid dot */}
      <span
        className="relative block rounded-full shadow-lg"
        style={{
          width: size,
          height: size,
          backgroundColor: "var(--color-brand-accent)",
          boxShadow: "0 0 8px rgba(200, 135, 58, 0.6)",
        }}
      />
      {/* City label — visible on hover (desktop) */}
      <span
        className="absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap 
                   text-[10px] font-semibold tracking-wide text-brand-dark bg-white/90 
                   backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   pointer-events-none hidden md:block"
      >
        {city}
      </span>
    </div>
  );
}

export default memo(CityPulseMarker);
