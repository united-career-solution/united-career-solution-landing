"use client";

import { motion } from "framer-motion";

export default function FloatingBadge({ text, top, left, right, bottom, delay = 0, floatDuration = 5, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: delay,
                duration: 0.7,
                ease: "easeOut",
            }}
            className={`absolute z-[5] hidden md:flex items-center justify-center px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/80 backdrop-blur-md shadow-warm-lg border border-brand-border/50 text-brand-dark font-bold text-xs md:text-sm tracking-wide pointer-events-none ${className}`}
            style={{ top, left, right, bottom }}
        >
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center justify-center"
            >
                {text}
            </motion.div>
        </motion.div>
    );
}
