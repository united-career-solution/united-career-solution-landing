"use client";

import { memo, useContext } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  MapContext,
} from "react-simple-maps";
import FloatingJobIcons from "./FloatingJobIcons";
import { useParallax } from "@/hooks/useParallax";

/**
 * HeroMapAnimation — Full world map with USA & UK highlighted.
 *
 * Animated arcs from India → USA and India → UK.
 * Uses MapContext to get the exact projection, so arc endpoints are
 * always pixel-perfect regardless of viewport size.
 */

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const HIGHLIGHTED = new Set(["840", "826"]);

// Accent color from globals.css
const ACCENT = "#C8873A";

// Coordinates [lon, lat]
const INDIA_COORD  = [78.9629, 22.5937];   // geographic centre of India
const USA_COORD    = [-98.5795, 39.8283];  // geographic centre of USA
const UK_COORD     = [-3.4360,  55.3781];  // geographic centre of UK

const cities = [
  { city: "New York",    coordinates: [-74.006,  40.712], primary: true  },
  { city: "Los Angeles", coordinates: [-118.244, 34.052], primary: false },
  { city: "Chicago",     coordinates: [-87.629,  41.878], primary: false },
  { city: "London",      coordinates: [-0.128,   51.507], primary: true  },
  { city: "Mumbai",      coordinates: [72.877,   19.076], primary: true  },
];

/**
 * Draws animated arcs by reading the real projection from MapContext.
 * This guarantees the paths start/end exactly on the country centres.
 */
function AnimatedArcs() {
  const { projection } = useContext(MapContext);
  if (!projection) return null;

  const [ix, iy] = projection(INDIA_COORD);
  const [ux, uy] = projection(USA_COORD);
  const [kx, ky] = projection(UK_COORD);

  // Quadratic bezier — control point floats above the midpoint
  const usaCtrlX = (ix + ux) / 2;
  const usaCtrlY = Math.min(iy, uy) - 90;
  const ukCtrlX  = (ix + kx) / 2;
  const ukCtrlY  = Math.min(iy, ky) - 60;

  const usaD = `M ${ix} ${iy} Q ${usaCtrlX} ${usaCtrlY} ${ux} ${uy}`;
  const ukD  = `M ${ix} ${iy} Q ${ukCtrlX}  ${ukCtrlY}  ${kx} ${ky}`;

  return (
    <g>
      {/* ── India → USA ── */}
      {/* soft glow */}
      <path d={usaD} fill="none" stroke={ACCENT} strokeWidth={4} strokeLinecap="round" opacity={0.18} />
      {/* animated line */}
      <path d={usaD} fill="none" stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round"
        strokeDasharray="800" strokeDashoffset="800">
        <animate attributeName="stroke-dashoffset" from="800" to="0"
          dur="3s" repeatCount="indefinite" />
      </path>
      {/* dot travelling along USA arc */}
      <circle r="3" fill={ACCENT} opacity="0.95">
        <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
          <mpath href="#arc-usa" />
        </animateMotion>
      </circle>
      <path id="arc-usa" d={usaD} fill="none" visibility="hidden" />

      {/* ── India → UK ── */}
      <path d={ukD} fill="none" stroke={ACCENT} strokeWidth={4} strokeLinecap="round" opacity={0.18} />
      <path d={ukD} fill="none" stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round"
        strokeDasharray="500" strokeDashoffset="500">
        <animate attributeName="stroke-dashoffset" from="500" to="0"
          dur="2.4s" begin="1s" repeatCount="indefinite" />
      </path>
      {/* dot travelling along UK arc */}
      <circle r="3" fill={ACCENT} opacity="0.95">
        <animateMotion dur="2.4s" begin="1s" repeatCount="indefinite" rotate="auto">
          <mpath href="#arc-uk" />
        </animateMotion>
      </circle>
      <path id="arc-uk" d={ukD} fill="none" visibility="hidden" />
    </g>
  );
}

function HeroMapAnimation() {
  const parallax = useParallax(12);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-[820px] mx-auto"
      style={{
        transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
        willChange: "transform",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-56 h-56 md:w-80 md:h-80 rounded-full blur-[100px]"
          style={{ backgroundColor: "rgba(200, 135, 58, 0.10)" }} />
        <div className="absolute top-1/3 right-1/4 w-44 h-44 md:w-64 md:h-64 rounded-full blur-[80px]"
          style={{ backgroundColor: "rgba(46, 93, 142, 0.08)" }} />
      </div>

      {/* World map */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }} className="w-full">
        <ComposableMap
          projectionConfig={{ scale: 147, center: [0, 15] }}
          className="w-full h-auto"
          style={{ background: "transparent" }}
        >
          {/* Countries */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isHighlighted = HIGHLIGHTED.has(geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? ACCENT : "rgba(46, 93, 142, 0.12)"}
                    stroke={isHighlighted ? "rgba(255,255,255,0.5)" : "rgba(46, 93, 142, 0.25)"}
                    strokeWidth={isHighlighted ? 0.6 : 0.3}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: isHighlighted ? ACCENT : "rgba(46, 93, 142, 0.22)" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Animated arcs — reads real projection from MapContext */}
          <AnimatedArcs />

          {/* City dots */}
          {cities.map((c) => (
            <Marker key={c.city} coordinates={c.coordinates}>
              <circle r={c.primary ? 3 : 2}
                fill={c.primary ? ACCENT : "var(--color-brand-secondary)"}
                stroke="#fff" strokeWidth={0.8} opacity={0.9} />
            </Marker>
          ))}

          {/* India highlighted dot + label */}
          <Marker coordinates={INDIA_COORD}>
            <circle r={5} fill={ACCENT} stroke="#fff" strokeWidth={1.2} opacity={0.95} />
            <circle r={9} fill="none" stroke={ACCENT} strokeWidth={0.8} opacity={0.35} />
            <text y={-12} textAnchor="middle" fontSize={7} fontWeight="700"
              fill={ACCENT} style={{ fontFamily: "var(--font-heading)" }}>
              India
            </text>
          </Marker>

          {/* USA label */}
          <Marker coordinates={USA_COORD}>
            <text y={-8} textAnchor="middle" fontSize={6} fontWeight="700"
              fill={ACCENT} opacity={0.7} style={{ fontFamily: "var(--font-heading)" }}>
              USA
            </text>
          </Marker>

          {/* UK label */}
          <Marker coordinates={UK_COORD}>
            <text y={-8} textAnchor="middle" fontSize={6} fontWeight="700"
              fill={ACCENT} opacity={0.7} style={{ fontFamily: "var(--font-heading)" }}>
              UK
            </text>
          </Marker>
        </ComposableMap>
      </motion.div>

      {/* Floating Icons */}
      <FloatingJobIcons />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l border-t border-brand-accent/10 rounded-tl-lg z-[1]" />
      <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r border-b border-brand-accent/10 rounded-br-lg z-[1]" />

      {/* Badge */}
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
