"use client";

import { memo } from "react";
import { motion } from "framer-motion";

/**
 * ConnectionLines — Animated curved lines forming a UK↔USA hiring network.
 *
 * Every dot is connected across the Atlantic:
 * - London → New York (primary)
 * - London → Houston
 * - Manchester → Chicago
 * - Manchester → Los Angeles
 *
 * Each UK dot connects to 2 USA dots. Every USA dot has at least 1 UK connection.
 */

// City positions in viewBox 0 0 100 80 (y = percentage * 0.8)
const cityPos = {
  ny:         { x: 52.3, y: 37.2 },
  la:         { x: 6.9,  y: 44.0 },
  houston:    { x: 30.4, y: 48.4 },
  chicago:    { x: 38.3, y: 36.0 },
  london:     { x: 86.3, y: 47.2 },
  manchester: { x: 80.8, y: 42.1 },
};

const connections = [
  // London connections (2 USA dots)
  {
    id: "london-newyork",
    from: cityPos.london,
    to: cityPos.ny,
    delay: 0.5,
    primary: true,
    arcHeight: 18,
  },
  {
    id: "london-houston",
    from: cityPos.london,
    to: cityPos.houston,
    delay: 3.0,
    primary: false,
    arcHeight: 22,
  },
  // Manchester connections (2 USA dots)
  {
    id: "manchester-chicago",
    from: cityPos.manchester,
    to: cityPos.chicago,
    delay: 1.8,
    primary: false,
    arcHeight: 16,
  },
  {
    id: "manchester-la",
    from: cityPos.manchester,
    to: cityPos.la,
    delay: 4.5,
    primary: false,
    arcHeight: 24,
  },
];

function ConnectionLines() {
  return (
    <svg
      viewBox="0 0 100 80"
      className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        {/* Primary international line gradient */}
        <linearGradient id="lineGradPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-brand-accent)" stopOpacity="0.9" />
          <stop offset="50%" stopColor="var(--color-brand-accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-brand-secondary)" stopOpacity="0.9" />
        </linearGradient>
        {/* Secondary line gradient */}
        <linearGradient id="lineGradSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-brand-accent)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="var(--color-brand-accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-brand-secondary)" stopOpacity="0.5" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {connections.map((conn) => {
        const midX = (conn.from.x + conn.to.x) / 2;
        const midY = Math.min(conn.from.y, conn.to.y) - conn.arcHeight;
        const pathD = `M ${conn.from.x} ${conn.from.y} Q ${midX} ${midY} ${conn.to.x} ${conn.to.y}`;
        const reversePath = `M ${conn.to.x} ${conn.to.y} Q ${midX} ${midY} ${conn.from.x} ${conn.from.y}`;

        return (
          <g key={conn.id}>
            {/* Main animated arc line */}
            <motion.path
              d={pathD}
              stroke={`url(#lineGrad${conn.primary ? "Primary" : "Secondary"})`}
              strokeWidth={conn.primary ? 0.35 : 0.2}
              strokeLinecap="round"
              filter="url(#lineGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: 5,
                delay: conn.delay,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
                times: [0, 0.4, 0.7, 1],
              }}
            />

            {/* Forward traveling particle */}
            <motion.circle
              r={conn.primary ? 0.7 : 0.5}
              fill="var(--color-brand-accent)"
              filter="url(#lineGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 5,
                delay: conn.delay + 0.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
                times: [0, 0.1, 0.8, 1],
              }}
            >
              <animateMotion
                dur={`${conn.primary ? 3 : 3.5}s`}
                repeatCount="indefinite"
                begin={`${conn.delay + 0.8}s`}
                path={pathD}
              />
            </motion.circle>

            {/* Reverse traveling particle */}
            <motion.circle
              r={conn.primary ? 0.5 : 0.35}
              fill="var(--color-brand-secondary)"
              filter="url(#lineGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: 5,
                delay: conn.delay + 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
                times: [0, 0.1, 0.8, 1],
              }}
            >
              <animateMotion
                dur={`${conn.primary ? 4 : 4.5}s`}
                repeatCount="indefinite"
                begin={`${conn.delay + 1.5}s`}
                path={reversePath}
              />
            </motion.circle>
          </g>
        );
      })}
    </svg>
  );
}

export default memo(ConnectionLines);
