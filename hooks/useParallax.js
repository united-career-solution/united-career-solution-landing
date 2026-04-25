"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useParallax — Tracks mouse position and returns smoothed offset values
 * for a parallax depth effect. Disabled on touch devices.
 *
 * @param {number} strength — Multiplier for the offset (default 15)
 * @returns {{ x: number, y: number }} — Pixel offsets to apply via transform
 */
export function useParallax(strength = 15) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      // Normalize to -1 → 1 range based on viewport center
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRef.current = { x: nx * strength, y: ny * strength };
    },
    [strength]
  );

  useEffect(() => {
    // Skip on touch devices
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isTouch) return;

    // Skip on narrow viewports (mobile/tablet)
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth lerp animation loop
    const animate = () => {
      const lerp = 0.08;
      currentRef.current = {
        x: currentRef.current.x + (targetRef.current.x - currentRef.current.x) * lerp,
        y: currentRef.current.y + (targetRef.current.y - currentRef.current.y) * lerp,
      };
      setOffset({
        x: Math.round(currentRef.current.x * 100) / 100,
        y: Math.round(currentRef.current.y * 100) / 100,
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return offset;
}
