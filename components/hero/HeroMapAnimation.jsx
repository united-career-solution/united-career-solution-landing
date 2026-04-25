"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import CityPulseMarker from "./CityPulseMarker";
import ConnectionLines from "./ConnectionLines";
import FloatingJobIcons from "./FloatingJobIcons";
import { useParallax } from "@/hooks/useParallax";
import {
  US_STATES_PATH,
  UK_MAIN_PATH,
  UK_IRELAND_PATH,
  UK_REGIONS_PATH,
} from "./mapPaths";

/**
 * HeroMapAnimation — Main orchestrator for the USA & UK animated map experience.
 *
 * Features:
 * - Continental USA with 49 state boundaries (no Alaska/Hawaii)
 * - UK (Great Britain + Ireland) with Scotland/England/Wales region borders
 * - City pulse markers, network connection lines, floating icons, parallax depth
 *
 * SVG paths extracted from Natural Earth via us-atlas@3 and world-atlas@2.
 * viewBox: 0 0 100 80 — USA fills left ~58%, UK fills right ~30%.
 */

// --- City coordinates — projected from real lat/lon to percentage positions ---
const cities = {
  usa: [
    { city: "New York",    x: 52.3,  y: 46.5,  primary: true,  delay: 0.2 },
    { city: "Los Angeles", x: 6.9,   y: 55.0,  primary: true,  delay: 0.6 },
    { city: "Houston",     x: 30.4,  y: 60.5,  primary: false, delay: 1.0 },
    { city: "Chicago",     x: 38.3,  y: 45.0,  primary: false, delay: 1.4 },
  ],
  uk: [
    { city: "London",      x: 86.3,  y: 59.0,  primary: true,  delay: 0.4 },
    { city: "Manchester",  x: 80.8,  y: 52.6,  primary: false, delay: 0.8 },
  ],
};

function HeroMapAnimation() {
  const parallax = useParallax(12);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-[780px] mx-auto"
      style={{
        aspectRatio: "100 / 80",
        transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
        willChange: "transform",
      }}
    >
      {/* Ambient glow behind the maps */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 left-1/6 w-56 h-56 md:w-80 md:h-80 rounded-full blur-[100px]"
          style={{ backgroundColor: "rgba(200, 135, 58, 0.08)" }}
        />
        <div
          className="absolute top-1/4 right-1/6 w-44 h-44 md:w-64 md:h-64 rounded-full blur-[80px]"
          style={{ backgroundColor: "rgba(46, 93, 142, 0.06)" }}
        />
      </div>

      {/* Subtle dot-grid background for depth */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] z-[1]"
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="heroGrid" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.3" fill="var(--color-brand-dark)" />
          </pattern>
        </defs>
        <rect width="100" height="80" fill="url(#heroGrid)" />
      </svg>

      {/* === MAP SVG LAYER — State & region-level detail === */}
      <svg
        viewBox="0 0 100 80"
        className="absolute inset-0 w-full h-full z-[2]"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          {/* Map fill — USA states */}
          <linearGradient id="usaStateFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-secondary)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--color-brand-secondary)" stopOpacity="0.05" />
          </linearGradient>
          {/* Map fill — UK */}
          <linearGradient id="ukFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-secondary)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--color-brand-secondary)" stopOpacity="0.07" />
          </linearGradient>
          {/* Subtle glow for map strokes */}
          <filter id="mapGlow">
            <feGaussianBlur stdDeviation="0.12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ---- Continental USA (49 state boundaries, no Alaska) ---- */}
        <motion.g
          initial={{ opacity: 0, x: -3 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <path
            d={US_STATES_PATH}
            fill="url(#usaStateFill)"
            stroke="var(--color-brand-secondary)"
            strokeWidth="0.12"
            strokeOpacity="0.25"
            strokeLinejoin="round"
            filter="url(#mapGlow)"
          />
          {/* USA label */}
          <text
            x="28"
            y="54"
            fill="var(--color-brand-secondary)"
            fontSize="3.2"
            fontWeight="700"
            fontFamily="var(--font-heading)"
            opacity="0.10"
            letterSpacing="0.4"
          >
            USA
          </text>
        </motion.g>

        {/* ---- UK (Great Britain + Ireland + region boundaries) ---- */}
        <motion.g
          initial={{ opacity: 0, x: 3 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          {/* Great Britain mainland */}
          <path
            d={UK_MAIN_PATH}
            fill="url(#ukFill)"
            stroke="var(--color-brand-secondary)"
            strokeWidth="0.18"
            strokeOpacity="0.35"
            strokeLinejoin="round"
            filter="url(#mapGlow)"
          />
          {/* Ireland */}
          <path
            d={UK_IRELAND_PATH}
            fill="url(#ukFill)"
            stroke="var(--color-brand-secondary)"
            strokeWidth="0.12"
            strokeOpacity="0.2"
            strokeLinejoin="round"
          />
          {/* Internal region boundaries (Scotland/England/Wales) */}
          <path
            d={UK_REGIONS_PATH}
            fill="none"
            stroke="var(--color-brand-secondary)"
            strokeWidth="0.12"
            strokeOpacity="0.2"
            strokeLinejoin="round"
            strokeDasharray="0.4,0.3"
          />
          {/* UK label */}
          <text
            x="80"
            y="62"
            fill="var(--color-brand-secondary)"
            fontSize="2.6"
            fontWeight="700"
            fontFamily="var(--font-heading)"
            opacity="0.10"
            letterSpacing="0.2"
            textAnchor="middle"
          >
            UK
          </text>
        </motion.g>

        {/* ---- Atlantic Ocean label ---- */}
        <text
          x="60"
          y="66"
          fill="var(--color-brand-muted)"
          fontSize="1.4"
          fontStyle="italic"
          opacity="0.05"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          ATLANTIC
        </text>
      </svg>

      {/* === CONNECTION LINES LAYER === */}
      <ConnectionLines />

      {/* === CITY PULSE MARKERS === */}
      {[...cities.usa, ...cities.uk].map((c) => (
        <CityPulseMarker
          key={c.city}
          city={c.city}
          x={c.x}
          y={c.y}
          delay={c.delay}
          primary={c.primary}
        />
      ))}

      {/* === FLOATING ICONS === */}
      <FloatingJobIcons />

      {/* === DECORATIVE CORNER ACCENTS === */}
      <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l border-t border-brand-accent/10 rounded-tl-lg z-[1]" />
      <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r border-b border-brand-accent/10 rounded-br-lg z-[1]" />

      {/* "Connecting Talent Globally" badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20
                   flex items-center gap-2 bg-white/80 backdrop-blur-md
                   px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-warm border border-brand-border
                   text-[10px] md:text-xs font-semibold text-brand-dark tracking-wide whitespace-nowrap"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
        </span>
        Connecting Talent Globally
      </motion.div>
    </motion.div>
  );
}

export default memo(HeroMapAnimation);
