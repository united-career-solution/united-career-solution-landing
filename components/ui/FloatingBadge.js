"use client";

import { motion } from "framer-motion";

export default function FloatingBadge({ text, top, left, right, bottom, delay = 0, floatDuration = 5, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                delay: delay,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
            }}
            className={`absolute z-10 hidden md:flex items-center justify-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-warm-lg border border-brand-border/50 text-brand-dark font-bold text-sm tracking-wide ${className}`}
            style={{ top, left, right, bottom }}
        >
            <motion.span
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
            >
                {text}
            </motion.span>
        </motion.div>
    );
}
